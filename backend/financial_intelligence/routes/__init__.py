from fastapi import APIRouter
from .user import router as user_router
from .loan import router as loan_router
from .auth import router as auth_router
from .loan_application import router as loan_application_router

router = APIRouter(prefix="/api/v1")

router.include_router(user_router)
router.include_router(loan_router)
router.include_router(auth_router)
router.include_router(loan_application_router)
