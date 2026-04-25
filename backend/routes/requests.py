from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas
from dependencies import get_current_user, admin_only

from services.notifications import notify_request_status

router = APIRouter(prefix="/requests", tags=["Requests"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.RequestOut)
def create_request(
    req: schemas.RequestCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if user.role != "sdp":
        raise HTTPException(status_code=403, detail="Only SDP can create requests")
    item = db.query(models.Item).filter(models.Item.id == req.item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    new_req = models.Request(
        item_id=req.item_id,
        sdp_id=user.id,
        quantity=req.quantity,
        status="pending"
    )
    db.add(new_req)
    db.commit()
    db.refresh(new_req)
    return new_req

@router.get("/", response_model=list[schemas.RequestOut])
def get_requests(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if user.role == "admin":
        return db.query(models.Request).all()
    else:
        return db.query(models.Request).filter(models.Request.sdp_id == user.id).all()

@router.put("/{request_id}")
def update_status(
    request_id: int,
    data: schemas.RequestUpdate,
    db: Session = Depends(get_db),
    user=Depends(admin_only)
):
    req = db.query(models.Request).filter(models.Request.id == request_id).first()

    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
    valid_status = ["approved", "rejected", "delivered"]
    if data.status not in valid_status:
        raise HTTPException(status_code=400, detail="Invalid status")
    if data.status == "delivered" and req.status != "approved":
        raise HTTPException(status_code=400, detail="Request must be approved first")

    if data.status == "delivered":
        item = db.query(models.Item).filter(models.Item.id == req.item_id).first()

        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        if item.quantity < req.quantity:
            raise HTTPException(status_code=400, detail="Not enough stock")

        item.quantity -= req.quantity
    req.status = data.status
    db.commit()
    user_obj = db.query(models.User).filter(models.User.id == req.sdp_id).first()
    if user_obj:
        notify_request_status(user_obj.email, data.status)

    return {"message": f"Request marked as {data.status}"}