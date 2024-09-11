from argon2 import PasswordHasher
from fastapi import Depends, HTTPException, Response,status
import jwt
from sqlmodel import Session, select

from financial_intelligence.auth import get_user_jwt
from financial_intelligence.auth.schema import Auth
from financial_intelligence.database import get_session
from financial_intelligence.config import config
from financial_intelligence.user.schema import JWTPayload, LoginModel, User

from . import router


@router.post("/login", response_model=str)
def login(reponse: Response,data:LoginModel,session: Session= Depends(get_session)) -> str:
    ph = PasswordHasher()
    db_user = session.scalar(select(Auth).join(User, User.id == Auth.user_id).where(User.email == data.email))
    print(db_user)
    try :
        if db_user is None:
            raise Exception("No user found")
    
        ph.verify(db_user.password,data.password)
        return jwt.encode(JWTPayload(user_id=str(db_user.user_id)).model_dump(), config.jwt_secret, algorithm=config.jwt_algorithm)
    except Exception as e:
        print(e)
        reponse.status_code=status.HTTP_401_UNAUTHORIZED
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invaild email or password")
    
@router.get("/info/me", response_model=User)
def get_user_info(user_jwt=Depends(get_user_jwt),session: Session= Depends(get_session)):
    db_user = session.scalar(select(User).where(User.id == user_jwt.user_id))
    return db_user