# main.py
from fastapi import FastAPI, HTTPException
from models.user import UserCreate, UserUpdate, User
from utils.password import hash_password
from database.memory_store import UserStore
from typing import List
from mangum import Mangum

app = FastAPI(title="User Management API")
user_store = UserStore()

# Create handler for Lambda
handler = Mangum(app)

@app.get("/")
async def welcome():
    return {
        "message": "Welcome to User Management API",
        "version": "1.0"
    }

@app.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    if user_store.email_exists(user.email):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    hashed_password = hash_password(user.password)
    user_data = user_store.create_user(user, hashed_password)
    return user_data

@app.get("/users/", response_model=List[User])
async def read_users(skip: int = 0, limit: int = 100):
    return user_store.get_users(skip, limit)

@app.get("/users/{user_id}", response_model=User)
async def read_user(user_id: int):
    user = user_store.get_user(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/users/{user_id}", response_model=User)
async def update_user(user_id: int, user: UserUpdate):
    current_user = user_store.get_user(user_id)
    if current_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = {}
    if user.email is not None:
        if user.email != current_user['email'] and user_store.email_exists(user.email):
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
        update_data['email'] = user.email
    
    if user.full_name is not None:
        update_data['full_name'] = user.full_name
    
    if user.password is not None:
        update_data['password_hash'] = hash_password(user.password)
    
    updated_user = user_store.update_user(user_id, update_data)
    return updated_user

@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    if not user_store.delete_user(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}