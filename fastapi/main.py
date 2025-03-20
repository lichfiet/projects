from typing import Union
from pydantic import BaseModel
from pydantic import validator

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

class Cat(BaseModel):
    name: str
    age: int

    @validator("age")
    def check_age(cls, value):
        if value < 0:
            raise ValueError("Age must be positive")
        return value
    @validator("name")
    def check_name(cls, value):
        if len(value) < 3:
            raise ValueError("Age is too short, what the crap")
        return value

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Whiskers",
                "age": 3
            }
        }

@app.post("/cat")
def create_cat(cat: Cat):
    return {"name": cat.name, "age": cat.age}
