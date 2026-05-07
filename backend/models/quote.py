from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime, timezone
import uuid

class QuoteRequestBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=1, max_length=20)
    company: Optional[str] = Field(None, max_length=100)
    service_type: str = Field(..., min_length=1, max_length=100)
    budget_range: Optional[str] = Field(None, max_length=50)
    timeline: Optional[str] = Field(None, max_length=100)
    project_description: str = Field(..., min_length=1, max_length=2000)
    additional_requirements: Optional[str] = Field(None, max_length=1000)

class QuoteRequestCreate(QuoteRequestBase):
    pass

class QuoteRequest(QuoteRequestBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="pending")  # pending, reviewed, quoted, accepted, rejected
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "+1 (555) 123-4567",
                "company": "Acme Corp",
                "service_type": "Consulting Services",
                "budget_range": "$10,000 - $25,000",
                "timeline": "3-6 months",
                "project_description": "Looking for business consulting services",
                "additional_requirements": "Monthly progress reports",
                "created_at": "2025-12-18T10:30:00",
                "status": "pending"
            }
        }
