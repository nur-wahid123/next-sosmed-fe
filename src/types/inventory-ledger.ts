import { Ineventory } from "./inventory";
import { Purchase } from "./purchase";
import { Sale } from "./sale";

export interface InventoryLedger {
  id: number;
  qty: number;
  direction: number;
  qtyBeforeUpdate: number;
  qtyAfterUpdate: number;
  inventory: Ineventory;
  purchase: Purchase;
  sale: Sale;
}
