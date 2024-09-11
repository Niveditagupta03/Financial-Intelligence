from fastapi import APIRouter

router = APIRouter(prefix="/loan_application",tags=["loan_application"])
 
from . import routes 