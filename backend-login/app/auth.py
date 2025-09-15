import os
from datetime import datetime, timedelta
from jose import jwt

ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60 * 24

def _get_secret() -> str:
    secret = os.getenv("JWT_KEY")
    if not secret:
        raise RuntimeError("JWT_KEY not configured")
    return secret

def create_access_token(payload: dict) -> str:
    to_encode = payload.copy()
    to_encode["exp"] = datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES)
    return jwt.encode(to_encode, _get_secret(), algorithm=ALGORITHM)

def decode_token(token: str) -> dict:
    return jwt.decode(token, _get_secret(), algorithms=[ALGORITHM])
