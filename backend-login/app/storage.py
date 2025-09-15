from typing import Dict, Optional
from passlib.context import CryptContext

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User:
    def __init__(self, name: str, email: str, hashed_password: str):
        self.name = name
        self.email = email
        self.hashed_password = hashed_password

_db_users: Dict[str, User] = {}

def create_user(name: str, email: str, password: str) -> None:
    if email in _db_users:
        raise ValueError("User already exists")
    hashed = pwd_ctx.hash(password)
    _db_users[email] = User(name=name, email=email, hashed_password=hashed)

def get_user(email: str) -> Optional[User]:
    return _db_users.get(email)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_ctx.verify(plain, hashed)
