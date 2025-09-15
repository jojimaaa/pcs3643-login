from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .schemas import SignupRequest, LoginRequest, LoginResponse, MessageResponse
from .storage import create_user, get_user, verify_password
from .auth import create_access_token, decode_token

app = FastAPI(title="PCS3643 - Login API", version="1.0.0")

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

@app.get("/api/ping", response_model=MessageResponse)
def ping():
    return {"message": "pong"}

@app.post("/api/auth/signup", response_model=MessageResponse, status_code=201)
def signup(body: SignupRequest):
    try:
        create_user(name=body.name, email=body.email, password=body.password)
        return {"message": "user created"}
    except ValueError:
        raise HTTPException(status_code=409, detail="email already registered")

@app.post("/api/auth/login", response_model=LoginResponse)
def login(body: LoginRequest):
    user = get_user(body.email)
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="invalid credentials")
    token = create_access_token({"sub": body.email, "name": user.name})
    return {"token": token}

class TokenBody(BaseModel):
    token: str

@app.post("/api/profile/debug", response_model=dict)
def profile_debug(body: TokenBody):
    try:
        payload = decode_token(body.token)
        return {"payload": payload}
    except Exception:
        raise HTTPException(status_code=401, detail="invalid or expired token")
