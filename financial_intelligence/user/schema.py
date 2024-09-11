from enum import Enum
from pydantic import BaseModel
from sqlmodel import SQLModel,Field
import uuid as uuid_pkg


class GenderEnum(str, Enum):
    FEMALE = "Female"
    MALE = "Male"
class MarriedEnum(str, Enum):
    MARRIED = "Married"
    UNMARRIED = "unmarried"
class EducationEnum(str, Enum):
    GRADUATE = "Graduate"
    UNDER_GRADUATE = "Under Graduate"
class SelfEmployeeEnum(str, Enum):
    NO = "N"
    YES = "Y"
class PropertyAreaEnum(str, Enum):
    URBAN = "Urban"
    SEMI_URBAN = "Semi-Urban"
    RURAL = "Rural"

class BaseUser(BaseModel):
    name: str
    age : int
    gender : GenderEnum
    email: str
    married: MarriedEnum
    education: EducationEnum
    dependents:	int
    self_employed:	SelfEmployeeEnum
    income: int
    credit_history:	int
    property_area:	PropertyAreaEnum
    residential_assets_value: int
    commercial_assets_value: int
    luxury_assets_value: int
    bank_asset_value: int

class User(BaseUser,SQLModel, table=True):
    id: uuid_pkg.UUID=Field(
        default_factory=uuid_pkg.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )

class UserCreationModel(BaseUser):
    password : str

class LoginModel(BaseModel):
    email : str
    password: str
   
class JWTPayload(BaseModel):
    user_id : str
    
    
