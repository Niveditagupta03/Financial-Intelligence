from fastapi import APIRouter

router = APIRouter(prefix="/user", tags=["user"])

from . import routes 
