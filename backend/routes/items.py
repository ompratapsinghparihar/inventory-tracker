from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas
from services.notifications import check_low_stock
from dependencies import admin_only

router = APIRouter(prefix="/items", tags=["Items"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.ItemOut)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db),user=Depends(admin_only)):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    check_low_stock(db_item)
    return db_item

@router.get("/", response_model=list[schemas.ItemOut])
def get_items(db: Session = Depends(get_db)):
    return db.query(models.Item).all()

@router.put("/{item_id}")
def update_item(item_id: int, updated: schemas.ItemCreate, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not item:
        return {"error": "Item not found"}

    item.name = updated.name
    item.quantity = updated.quantity
    item.threshold = updated.threshold

    db.commit()
    check_low_stock(item)

    return {"message": "Item updated"}

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not item:
        return {"error": "Item not found"}

    db.delete(item)
    db.commit()
    return {"message": "Item deleted"}