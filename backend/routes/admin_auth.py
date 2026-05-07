from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from dependencies.auth import require_admin
import secrets
import os
import logging
import threading
from datetime import datetime, timedelta, timezone

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/admin", tags=["admin"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

AUTHORIZED_ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@yourbrand.com")
ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH", "")

SESSION_TTL = timedelta(hours=1)

_session_lock = threading.Lock()
active_sessions = {}


def is_session_valid(token: str) -> bool:
    with _session_lock:
        session = active_sessions.get(token)
        if not session:
            return False
        if datetime.now(timezone.utc) - session["created_at"] > SESSION_TTL:
            del active_sessions[token]
            return False
        return True


def _cleanup_expired_sessions():
    now = datetime.now(timezone.utc)
    expired = [t for t, s in active_sessions.items() if now - s["created_at"] > SESSION_TTL]
    for t in expired:
        del active_sessions[t]


class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str


class AdminLoginResponse(BaseModel):
    success: bool
    token: str = None
    message: str


class TokenValidationRequest(BaseModel):
    token: str


class ChangePasswordRequest(BaseModel):
    new_password: str


@router.post("/login", response_model=AdminLoginResponse)
async def admin_login(request: Request, credentials: AdminLoginRequest):
    if credentials.email.lower() != AUTHORIZED_ADMIN_EMAIL.lower():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to access the admin panel",
        )

    if not ADMIN_PASSWORD_HASH:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Admin password not configured",
        )

    if not pwd_context.verify(credentials.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password",
        )

    token = secrets.token_urlsafe(32)
    with _session_lock:
        _cleanup_expired_sessions()
        active_sessions[token] = {
            "email": credentials.email,
            "created_at": datetime.now(timezone.utc),
        }

    return AdminLoginResponse(
        success=True,
        token=token,
        message="Login successful",
    )


@router.post("/validate-token")
async def validate_token(request_body: TokenValidationRequest):
    if is_session_valid(request_body.token):
        return {"valid": True, "email": active_sessions[request_body.token]["email"]}
    return {"valid": False}


@router.post("/logout")
async def admin_logout(request_body: TokenValidationRequest):
    with _session_lock:
        active_sessions.pop(request_body.token, None)
    return {"success": True, "message": "Logged out successfully"}


@router.post("/change-password")
async def change_password(
    request: ChangePasswordRequest,
    _admin=Depends(require_admin),
):
    if len(request.new_password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters",
        )

    new_hash = pwd_context.hash(request.new_password)
    logger.info("New password hash generated. Set ADMIN_PASSWORD_HASH env var to update.")
    logger.info(f"Generated hash: {new_hash}")
    return {"message": "Password hash generated. Check server logs to update ADMIN_PASSWORD_HASH."}
