from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
import jwt
from financial_intelligence.config import config
from financial_intelligence.user.schema import JWTPayload


oauth2_scheme = HTTPBearer()


def get_user_jwt(token: Annotated[str, Depends(oauth2_scheme)]) -> JWTPayload:
    try:
        payload = jwt.decode(token.credentials, config.jwt_secret, algorithms=[config.jwt_algorithm])
        return JWTPayload(**payload)

    except:
         raise HTTPException(status.HTTP_401_UNAUTHORIZED,"invalid jwt")
    
