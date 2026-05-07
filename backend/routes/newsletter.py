from fastapi import APIRouter, Depends, HTTPException, Query, status
from models.newsletter import NewsletterSubscription, NewsletterSubscriptionCreate
from database import db
from dependencies.auth import require_admin
import logging
from typing import List

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])

newsletter_collection = db.newsletter_subscriptions


@router.post("/subscribe", response_model=NewsletterSubscription, status_code=status.HTTP_201_CREATED)
async def subscribe_newsletter(subscription_data: NewsletterSubscriptionCreate):
    try:
        existing = await newsletter_collection.find_one({"email": subscription_data.email})
        if existing:
            if existing.get('status') == 'active':
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Email already subscribed",
                )
            await newsletter_collection.update_one(
                {"email": subscription_data.email},
                {"$set": {"status": "active"}},
            )
            existing['status'] = 'active'
            return NewsletterSubscription(**existing)

        subscription = NewsletterSubscription(**subscription_data.dict())
        subscription_dict = subscription.dict()
        result = await newsletter_collection.insert_one(subscription_dict)

        if not result.inserted_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to subscribe",
            )

        logger.info(f"New newsletter subscription: {subscription.id}")
        return subscription

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to subscribe",
        )


@router.get("/", response_model=List[NewsletterSubscription])
async def get_subscriptions(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    _admin=Depends(require_admin),
):
    try:
        subscriptions = await newsletter_collection.find().sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        return [NewsletterSubscription(**sub) for sub in subscriptions]
    except Exception as e:
        logger.error(f"Error fetching subscriptions: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch subscriptions",
        )


@router.delete("/{email}/unsubscribe", status_code=status.HTTP_204_NO_CONTENT)
async def unsubscribe_newsletter(email: str):
    try:
        result = await newsletter_collection.update_one(
            {"email": email},
            {"$set": {"status": "unsubscribed"}},
        )
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Subscription not found",
            )
        logger.info("Newsletter unsubscription processed")
        return None
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error unsubscribing: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to unsubscribe",
        )
