import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, create_engine, select
from dotenv import load_dotenv

from models import Item, Deal, Recipe, Ingredient

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/mydb")
engine = create_engine(DATABASE_URL, echo=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In prod, restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_session():
    with Session(engine) as session:
        yield session


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


# ---------- CRUD ENDPOINTS ----------

@app.post("/items/")
def create_item(name: str, session: Session = Depends(get_session)):
    item = Item(name=name)
    session.add(item)
    try:
        session.commit()
        session.refresh(item)
    except Exception:
        session.rollback()
        raise HTTPException(status_code=400, detail="Item already exists")
    return item


@app.get("/items/")
def list_items(session: Session = Depends(get_session)):
    return session.exec(select(Item)).all()


@app.get("/deals/")
def list_deals(session: Session = Depends(get_session)):
    # Eager load related Item for each Deal
    deals = session.exec(select(Deal)).all()
    return deals


@app.get("/recipes/")
def list_recipes(session: Session = Depends(get_session)):
    return session.exec(select(Recipe)).all()


@app.get("/ingredients/")
def list_ingredients(session: Session = Depends(get_session)):
    return session.exec(select(Ingredient)).all()
