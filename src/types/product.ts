import { Ineventory } from "./inventory";

export interface Product {
  id?: number;
  name?: string;
  code?: string;
  buyPrice?: number;
  image?: string;
  sellPrice?: number;
  brand?: { id: number; name: string };
  category?: { id: number; name: string };
  uom?: { id: number; name: string };
  inventory?: Ineventory;
}
