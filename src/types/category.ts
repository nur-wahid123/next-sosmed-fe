import { Product } from "./product";

export interface Category {
  id?: number;
  name?: string;
  code?: string;
  products?: Product[];
}
