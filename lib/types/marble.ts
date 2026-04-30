export type StoneType = "Marble" | "Granite" | "Onyx";

export interface Marble {
  id: string;
  name: string;
  origin: string;
  color: string;
  stone_type: StoneType;
  price_sqft: number;
  price_min: number;
  price_max: number;
  in_stock: boolean;
  availability: "Ready Stock" | "Low Stock" | "Out of Stock";
  stock_sqft: number;
  image_url: string;
  description?: string;
  created_at?: string;
}
