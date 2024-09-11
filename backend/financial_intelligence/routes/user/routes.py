from argon2 import PasswordHasher
from fastapi import Depends, status
from sqlmodel import Session, select, delete, update

from financial_intelligence.auth.schema import Auth
from financial_intelligence.database import get_session
from financial_intelligence.user.schema import BaseUser, User, UserCreationModel
from . import router 


@router.get("/", response_model= list[User])
def list_user(session: Session= Depends(get_session)) -> list[User]: 
    return session.exec(select(User)).all()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=User)
def create_user(user: UserCreationModel, session: Session= Depends(get_session)) -> User:
    ph = PasswordHasher()
    db_user = User(**user.model_dump())
    session.add(db_user)
    session.commit()
    auth = Auth(user_id=db_user.id,password= ph.hash(user.password))
    session.add(auth)
    session.commit()
    session.refresh(db_user)
    return db_user

@router.put("/{user_id}", response_model= User )
def update_user(user_id: str,user: BaseUser, session: Session= Depends(get_session)) -> User:
    db_user = session.scalar(update(User).where(User.id == user_id).values(**user.model_dump()).returning(User))
    session.commit()
    session.refresh(db_user)
    return db_user

@router.delete("/{user_id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id:str, session: Session= Depends(get_session)):
    session.exec(delete(User).where(User.id == user_id))
    session.commit()
    return None

@router.get("/{user_id}",response_model=User )
def get_user(user_id:str,session: Session= Depends(get_session)) -> User:
    db_user = session.scalar(select(User).where(User.id == user_id))
    return db_user