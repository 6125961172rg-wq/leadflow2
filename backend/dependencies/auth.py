from fastapi import Header, HTTPException, status


async def require_admin(authorization: str = Header(...)):
    from routes.admin_auth import is_session_valid, active_sessions

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header",
        )
    token = authorization[7:]
    if not is_session_valid(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    return active_sessions[token]
