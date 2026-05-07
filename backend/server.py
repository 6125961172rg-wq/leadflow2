from fastapi import FastAPI, APIRouter, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

from database import db, client, ensure_indexes

from routes.leads import router as leads_router
from routes.newsletter import router as newsletter_router
from routes.quotes import router as quotes_router
from routes.admin_auth import router as admin_auth_router


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

app = FastAPI()

api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
):
    status_checks = await db.status_checks.find({}, {"_id": 0}).sort("timestamp", -1).skip(skip).limit(limit).to_list(limit)

    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks


app.include_router(api_router)
app.include_router(leads_router)
app.include_router(newsletter_router)
app.include_router(quotes_router)
app.include_router(admin_auth_router)


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        return response


cors_origins = os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(',')

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[o.strip() for o in cors_origins],
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_db():
    await ensure_indexes()
    logger.info("Database indexes ensured")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
