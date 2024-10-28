import { PaymentStatus } from "@/enums/payment-status.enum"
import { Product } from "./product"
import { Payment } from "./payment"

export interface Purchase{
    id?: number
    code?: string
    date?: Date
    purchaseItems?:Product[]
    total:number
    paymentStatus?: PaymentStatus
    payments:Payment[]
}