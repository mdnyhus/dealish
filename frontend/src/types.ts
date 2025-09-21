// Note: this file must be maintained manually to be in sync with ../backend/models.py

export interface Item {
  id: number;
  name: string;
  regular_price: number;
  regular_unit?: string | null;
}

export interface Store {
  id: number;
  name: string;
  location?: string | null;
}

export interface Deal {
  id: number;
  item_id: number;
  store_id: number;
  price: number;
  unit?: string | null;
  postal_code?: string | null;
  valid_from?: string | null; // ISO date string
  valid_to: string; // ISO date string
}

export interface Recipe {
  id: number;
  name: string;
  description?: string | null;
}

export interface Ingredient {
  id: number;
  recipe_id: number;
  item_id: number;
  quantity: number;
  unit?: string | null;
}
