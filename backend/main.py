from fastapi import FastAPI, Depends, Request, Header, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from database import init_db, get_db
from auth import create_token, hash_password, authenticate_user, decode_token
from datetime import datetime
import google.generativeai as genai
from sqlite3 import IntegrityError
import os
from dotenv import load_dotenv
import sqlite3


load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

app = FastAPI()
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

class UserIn(BaseModel):
    email: EmailStr
    password: str

class GenerateRequest(BaseModel):
    topic: str

@app.post("/signup")
def signup(user: UserIn):
    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters long")
    
    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            (user.email.lower(), hash_password(user.password))
        )
        conn.commit()
        return {"message": "User registered successfully"}
    
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")

    finally:
        conn.close()

@app.post("/login")
def login(user: UserIn):
    db_user = authenticate_user(user.email.lower(), user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"sub": user.email})
    return {"token": token, "message": "Login successful"}



@app.get("/userinfo")
def get_user_info(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")
    
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    email = payload["sub"]

    conn = get_db()
    conn.row_factory = sqlite3.Row
    user = conn.execute("SELECT email, daily_requests, plan FROM users WHERE email = ?", (email,)).fetchone()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "email": user["email"],
        "daily_requests": user["daily_requests"],
        "plan": user["plan"]
    }


@app.post("/generate")
def generate(req: GenerateRequest, authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")

    token = authorization.split(" ")[1]
    payload = decode_token(token)
    email = payload["sub"]

    conn = get_db()
    conn.row_factory = sqlite3.Row
    user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()

    today = datetime.now().date()
    if user["last_used"]:
        last_used = datetime.strptime(user["last_used"], "%Y-%m-%d").date()
    else:
        last_used = None

    if user["plan"] == "free":
        if last_used != today:
            conn.execute("UPDATE users SET daily_requests = 1, last_used = ? WHERE email = ?", (today, email))
        elif user["daily_requests"] >= 10:
            return {"error": "Daily request limit reached. Upgrade your plan."}
        else:
            conn.execute("UPDATE users SET daily_requests = daily_requests + 1 WHERE email = ?", (email,))
        conn.commit()

    prompt = f"""Generate a short Instagram caption and 10 relevant hashtags for: "{req.topic}"
Format: 
Caption: <text>
Hashtags: #tag1 #tag2 #tag3 #tag4 #tag5"""

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        caption, hashtags = "", ""
        for line in text.splitlines():
            if line.lower().startswith("caption:"):
                caption = line.split(":", 1)[1].strip()
            elif line.lower().startswith("hashtags:"):
                hashtags = line.split(":", 1)[1].strip()

        return {"caption": caption, "hashtags": hashtags}
    except Exception as e:
        return {"error": str(e)}
