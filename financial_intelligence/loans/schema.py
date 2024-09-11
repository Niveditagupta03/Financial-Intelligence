from enum import Enum
from pydantic import BaseModel
from sqlmodel import SQLModel,Field
import uuid as uuid_pkg

class BaseLoan(BaseModel):
    name : str
    amount : int
    category: str
    
class Loan(BaseLoan,SQLModel,table = True):
    id: uuid_pkg.UUID=Field(
            default_factory=uuid_pkg.uuid4,
            primary_key=True,
            index=True,
            nullable=False,
        )
    
