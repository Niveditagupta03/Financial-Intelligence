import uuid
from sqlmodel import Field, SQLModel

class Auth(SQLModel,table = True):
    user_id: uuid.UUID = Field(
        index=True,
        nullable=False,
        primary_key= True,
        foreign_key="user.id"
    )
    password : str
