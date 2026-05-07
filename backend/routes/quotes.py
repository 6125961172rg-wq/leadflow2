from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, status
from models.quote import QuoteRequest, QuoteRequestCreate
from services.email_service import email_service
from database import db
from dependencies.auth import require_admin
import logging
from typing import List

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/quotes", tags=["quotes"])

quotes_collection = db.quote_requests


@router.post("/", response_model=QuoteRequest, status_code=status.HTTP_201_CREATED)
async def create_quote_request(quote_data: QuoteRequestCreate, background_tasks: BackgroundTasks):
    try:
        quote = QuoteRequest(**quote_data.dict())
        quote_dict = quote.dict()
        result = await quotes_collection.insert_one(quote_dict)

        if not result.inserted_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create quote request",
            )

        lead_dict = {
            'name': quote_dict['name'],
            'email': quote_dict['email'],
            'phone': quote_dict['phone'],
            'company': quote_dict.get('company', ''),
            'message': f"Quote Request for {quote_dict['service_type']}\n\nBudget: {quote_dict.get('budget_range', 'Not specified')}\nTimeline: {quote_dict.get('timeline', 'Not specified')}\n\nDescription: {quote_dict['project_description']}",
        }
        background_tasks.add_task(email_service.send_lead_notification, lead_dict)

        logger.info(f"New quote request created: {quote.id}")
        return quote

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating quote request: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create quote request",
        )


@router.get("/", response_model=List[QuoteRequest])
async def get_quote_requests(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    _admin=Depends(require_admin),
):
    try:
        quotes = await quotes_collection.find().sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        return [QuoteRequest(**quote) for quote in quotes]
    except Exception as e:
        logger.error(f"Error fetching quote requests: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch quote requests",
        )


@router.get("/{quote_id}", response_model=QuoteRequest)
async def get_quote_request(quote_id: str, _admin=Depends(require_admin)):
    try:
        quote = await quotes_collection.find_one({"id": quote_id})
        if not quote:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote request not found",
            )
        return QuoteRequest(**quote)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching quote request: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch quote request",
        )


@router.patch("/{quote_id}/status", response_model=QuoteRequest)
async def update_quote_status(
    quote_id: str,
    status_value: str = Query(..., alias="status"),
    _admin=Depends(require_admin),
):
    valid_statuses = ["pending", "reviewed", "quoted", "accepted", "rejected"]
    if status_value not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}",
        )

    try:
        result = await quotes_collection.find_one_and_update(
            {"id": quote_id},
            {"$set": {"status": status_value}},
            return_document=True,
        )

        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote request not found",
            )

        return QuoteRequest(**result)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating quote status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update quote status",
        )


@router.delete("/{quote_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_quote_request(quote_id: str, _admin=Depends(require_admin)):
    try:
        result = await quotes_collection.delete_one({"id": quote_id})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote request not found",
            )
        logger.info(f"Quote request deleted: {quote_id}")
        return None
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting quote request: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete quote request",
        )
