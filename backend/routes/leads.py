from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, status
from models.lead import Lead, LeadCreate
from services.email_service import email_service
from database import db
from dependencies.auth import require_admin
import logging
from typing import List

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/leads", tags=["leads"])

leads_collection = db.leads


@router.post("/", response_model=Lead, status_code=status.HTTP_201_CREATED)
async def create_lead(lead_data: LeadCreate, background_tasks: BackgroundTasks):
    try:
        lead = Lead(**lead_data.dict())
        lead_dict = lead.dict()
        result = await leads_collection.insert_one(lead_dict)

        if not result.inserted_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create lead",
            )

        background_tasks.add_task(email_service.send_lead_notification, lead_dict)

        logger.info(f"New lead created: {lead.id}")
        return lead

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating lead: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create lead",
        )


@router.get("/", response_model=List[Lead])
async def get_leads(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    _admin=Depends(require_admin),
):
    try:
        leads = await leads_collection.find().sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        return [Lead(**lead) for lead in leads]
    except Exception as e:
        logger.error(f"Error fetching leads: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch leads",
        )


@router.get("/{lead_id}", response_model=Lead)
async def get_lead(lead_id: str, _admin=Depends(require_admin)):
    try:
        lead = await leads_collection.find_one({"id": lead_id})
        if not lead:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead not found",
            )
        return Lead(**lead)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching lead: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch lead",
        )


@router.delete("/{lead_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_lead(lead_id: str, _admin=Depends(require_admin)):
    try:
        result = await leads_collection.delete_one({"id": lead_id})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead not found",
            )
        logger.info(f"Lead deleted: {lead_id}")
        return None
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting lead: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete lead",
        )


@router.patch("/{lead_id}/status", response_model=Lead)
async def update_lead_status(
    lead_id: str,
    status_value: str = Query(..., alias="status"),
    _admin=Depends(require_admin),
):
    valid_statuses = ["new", "contacted", "qualified", "converted"]
    if status_value not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}",
        )

    try:
        result = await leads_collection.find_one_and_update(
            {"id": lead_id},
            {"$set": {"status": status_value}},
            return_document=True,
        )

        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead not found",
            )

        return Lead(**result)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating lead status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update lead status",
        )
