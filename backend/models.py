from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    role = Column(String)  # admin / sdp
    location = Column(String)
    password = Column(String)

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    quantity = Column(Integer)
    threshold = Column(Integer)

class Request(Base):
    __tablename__ = "requests"
    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"))
    sdp_id = Column(Integer, ForeignKey("users.id"))
    quantity = Column(Integer)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)