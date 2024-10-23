export interface Product {
  id?: number;
  name?: string;
  code?: string;
  sellPrice?: number;
  brand?: { id: number; name: string };
  category?: { id: number; name: string };
  uom?: { id: number; name: string };
  inventory?: { qty: number };
}
