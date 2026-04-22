export type StoneType = "Marble" | "Granite";

export interface Marble {
  id: string;
  name: string;
  origin: "Rajasthan" | "Italy" | string;
  color: string;
  stone_type: StoneType;
  price_sqft: number;
  in_stock: boolean;
  image_url: string;
  description?: string;
  created_at?: string;
}
