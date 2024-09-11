from fastapi import APIRouter

router = APIRouter(prefix="/loan", tags=["loan"])

from . import routes 


