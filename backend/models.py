# Note: if this file changes, please also update ../frontend/types.ts

from typing import Optional, List
from datetime import date
from sqlmodel import Field, SQLModel, Relationship, UniqueConstraint

# An item we search for on flipp; ex "tomato" or "red onion"
class Item(SQLModel, table=True):
    __tablename__ = "item"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(sa_column_kwargs={"unique": True})

    deals: List["Deal"] = Relationship(back_populates="item")
    ingredients: List["Ingredient"] = Relationship(back_populates="item")

# An instance of the lowest price we've found on flipp. This is unique by item, postal code, and when the deal is valid to
class Deal(SQLModel, table=True):
    __tablename__ = "deal"
    __table_args__ = (UniqueConstraint("item_id", "postal_code", "valid_to"),)

    id: Optional[int] = Field(default=None, primary_key=True)
    item_id: int = Field(foreign_key="item.id")
    price: float
    unit: Optional[str] = None
    postal_code: Optional[str] = None
    valid_from: Optional[date] = None
    valid_to: date

    item: Item = Relationship(back_populates="deals")

# A recipe
class Recipe(SQLModel, table=True):
    __tablename__ = "recipe"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(sa_column_kwargs={"unique": True})
    description: Optional[str] = None

    ingredients: List["Ingredient"] = Relationship(back_populates="recipe")

# An ingredient of the recipe. This is not specific to any deal/date; callers should construct
# deal instances of recipes based on relevant deal objects
class Ingredient(SQLModel, table=True):
    __tablename__ = "ingredient"
    __table_args__ = (UniqueConstraint("recipe_id", "item_id"),)

    id: Optional[int] = Field(default=None, primary_key=True)
    recipe_id: int = Field(foreign_key="recipe.id")
    item_id: int = Field(foreign_key="item.id")
    quantity: float
    unit: Optional[str] = None

    recipe: Recipe = Relationship(back_populates="ingredients")
    item: Item = Relationship(back_populates="ingredients")
