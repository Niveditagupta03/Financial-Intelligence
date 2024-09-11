from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select,delete, update
from argon2 import PasswordHasher
from financial_intelligence.auth import get_user_jwt
from financial_intelligence.auth.schema import Auth
from financial_intelligence.database import dispose_engine, get_session, init_engine
from financial_intelligence.loans.schema import BaseLoan, Loan
from financial_intelligence.user.schema import BaseUser, JWTPayload, LoginModel, User, UserCreationModel
from financial_intelligence.config import config
from financial_intelligence.routes import router
@asynccontextmanager
async def lifespan(_: FastAPI):
    init_engine()
    yield
    dispose_engine()

app = FastAPI(lifespan=lifespan)
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
