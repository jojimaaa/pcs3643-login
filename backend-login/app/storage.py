from typing import Optional
from passlib.context import CryptContext
from sqlmodel import Session, select
from .db import engine
from .models import User, UserAuth

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _hash(password: str) -> str:
    return pwd_ctx.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_ctx.verify(plain, hashed)

def create_user(name: str, email: str, password: str) -> None:
    with Session(engine) as session:
        exists = session.exec(select(User).where(User.email == email)).first()
        if exists:
            raise ValueError("User already exists")
        user = User(name=name, email=email)
        session.add(user)
        session.commit()
        session.refresh(user)

        auth = UserAuth(email=email, hashed_password=_hash(password))
        session.add(auth)
        session.commit()

def get_user(email: str) -> Optional[User]:
    with Session(engine) as session:
        return session.exec(select(User).where(User.email == email)).first()

def get_user_hash(email: str) -> Optional[str]:
    with Session(engine) as session:
        auth = session.exec(select(UserAuth).where(UserAuth.email == email)).first()
        return auth.hashed_password if auth else None
