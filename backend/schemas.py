from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str
    location: str

class UserOut(UserCreate):
    id: int
    class Config:
        from_attributes = True

class ItemCreate(BaseModel):
    name: str
    quantity: int
    threshold: int

class ItemOut(ItemCreate):
    id: int
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str

class RequestCreate(BaseModel):
    item_id: int
    sdp_id: int
    quantity: int

class RequestUpdate(BaseModel):
    status: str

class RequestOut(BaseModel):
    id: int
    item_id: int
    sdp_id: int
    quantity: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True