import { PaymentStatus } from "@/enums/payment-status.enum";
import { Payment } from "./payment";
import { Product } from "./product";
import { SaleItem } from "./sale-item";

export interface Sale {
  id?: number;
  code?: string;
  date?: Date;
  saleItems?: SaleItem[];
  total: number;
  payments?: Payment[];
  paymentStatus: PaymentStatus;
}
