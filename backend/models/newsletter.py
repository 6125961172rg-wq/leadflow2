from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
import uuid

class NewsletterSubscriptionBase(BaseModel):
    email: EmailStr

class NewsletterSubscriptionCreate(NewsletterSubscriptionBase):
    pass

class NewsletterSubscription(NewsletterSubscriptionBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="active")  # active, unsubscribed
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "email": "subscriber@example.com",
                "created_at": "2025-12-18T10:30:00",
                "status": "active"
            }
        }
