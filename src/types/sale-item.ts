import { Ineventory } from "./inventory";
import { Product } from "./product";

export interface SaleItem {
  id?: number;
  buy_price?: number;
  price?: number;
  qty?: number;
  product?: Product;
  sub_total?: number;
}
