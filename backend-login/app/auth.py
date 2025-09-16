import os
from datetime import datetime, timedelta
from jose import jwt

ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 15  # 15 minutos

def _get_secret() -> str:
    secret = os.getenv("JWT_KEY")
    if not secret:
        raise RuntimeError("JWT_KEY not configured")
    return secret

def create_access_token(*, username: str, email: str) -> str:
    to_encode = {
        "username": username,
        "email": email,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES),
    }
    return jwt.encode(to_encode, _get_secret(), algorithm=ALGORITHM)

def decode_token(token: str) -> dict:
    return jwt.decode(token, _get_secret(), algorithms=[ALGORITHM])
