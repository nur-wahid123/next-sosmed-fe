import { PaymentStatus } from "@/enums/payment-status.enum";
import { Payment } from "./payment";
import { Product } from "./product";

export interface Sale {
  id?: number;
  code?: string;
  date?: Date;
  saleItems?: Product[];
  total: number;
  payments?: Payment[];
  paymentStatus: PaymentStatus;
}
