from enum import Enum
import uuid
from pydantic import BaseModel
from sqlmodel import Field, SQLModel
from datetime import datetime
from sqlmodel import SQLModel, Field


class ApplicationStatusEnum(str, Enum):
    PROCESSING = "Processing"
    APPROVED = "Approved"
    DENIED = "Denied"

class BaseLoanApplication(BaseModel):
    loan_term : int


class LoanApplication(BaseLoanApplication,SQLModel,table = True):
    user_id: uuid.UUID = Field(
        index=True,
        nullable=False,
        foreign_key="user.id"
    )
    loan_id: uuid.UUID = Field(
        index=True,
        nullable=False,
        foreign_key="loan.id"
    )
    status: ApplicationStatusEnum = Field(default_factory=lambda: ApplicationStatusEnum.PROCESSING)
    created_at: datetime = Field(default_factory=lambda: datetime.now())
    id: uuid.UUID=Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )


