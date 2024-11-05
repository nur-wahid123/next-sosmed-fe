import { InventoryLedger } from "./inventory-ledger";
import { Product } from "./product";

export interface Ineventory {
  id: number;
  qty: number;
  product: Product;
  inventoryLedgers: InventoryLedger[];
}
