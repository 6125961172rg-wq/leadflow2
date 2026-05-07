from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime, timezone
import uuid

class LeadBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=1, max_length=20)
    company: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=1, max_length=1000)

class LeadCreate(LeadBase):
    pass

class Lead(LeadBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="new")  # new, contacted, qualified, converted
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "+1 (555) 123-4567",
                "company": "Acme Corp",
                "message": "Interested in your services",
                "created_at": "2025-12-18T10:30:00",
                "status": "new"
            }
        }
