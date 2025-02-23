# database/memory_store.py
from typing import Dict
from datetime import datetime
from models.user import UserCreate

class UserStore:
    def __init__(self):
        self.users_db: Dict[int, dict] = {}
        self.current_id = 1

    def email_exists(self, email: str) -> bool:
        return any(user['email'] == email for user in self.users_db.values())

    def create_user(self, user: UserCreate, hashed_password: str) -> dict:
        timestamp = datetime.now()
        user_data = {
            "id": self.current_id,
            "email": user.email,
            "password_hash": hashed_password,
            "full_name": user.full_name,
            "created_at": timestamp,
            "updated_at": timestamp
        }
        
        self.users_db[self.current_id] = user_data
        self.current_id += 1
        return user_data

    def get_users(self, skip: int = 0, limit: int = 100) -> list:
        users = list(self.users_db.values())
        return users[skip : skip + limit]

    def get_user(self, user_id: int) -> dict:
        return self.users_db.get(user_id)

    def update_user(self, user_id: int, update_data: dict) -> dict:
        if user_id in self.users_db:
            user_data = self.users_db[user_id]
            user_data.update(update_data)
            user_data['updated_at'] = datetime.now()
            return user_data
        return None

    def delete_user(self, user_id: int) -> bool:
        if user_id in self.users_db:
            del self.users_db[user_id]
            return True
        return False

