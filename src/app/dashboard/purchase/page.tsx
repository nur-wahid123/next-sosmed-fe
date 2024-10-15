"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PurchaseItemsTable, {
  CartItem,
} from "@/components/pos/purchase-items.table";
import PaymentDetail from "@/components/pos/payment-detail";
import PaymentPurchase from "@/components/pos/payment-purchase";

export class PurchaseItem {
  id!: number;
  productName!: string;
  max_qty?: number = 0;
  uom?: {
    name: string;
  } = { name: "" };
  category?: string = "";
  quantity?: number = 0;
  price?: number = 0;
  total?: number = 0;
}

export default function PurchasePage() {
  const [carts, setCart] = useState<CartItem[]>();

  const [purchaseCode, setPurchaseCode] = useState<string>("");
  const [tab, setTab] = useState<"purchase" | "payment">("purchase");
  useEffect(() => {}, []);

  return (
    <Tabs
      value={tab}
      onValueChange={(e) => {
        setTab(e as "purchase" | "payment");
      }}
      className="w-full h-full overflow-y-auto"
    >
      <TabsList>
        <TabsTrigger value="purchase">Purchase</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full h-full" value="purchase">
        <h1 className="scroll-m-20 mb-2 text-2xl font-extrabold tracking-tight lg:text-5xl">
          Purchase
        </h1>
        <div className="flex flex-col h-full gap-4 items-start">
          <div className="flex h-full w-full gap-5">
            <PaymentDetail
              carts={carts}
              setPurchaseCode={setPurchaseCode}
              setTab={setTab}
            />
            <PurchaseItemsTable carts={carts} setCart={setCart} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="payment">
        <div className="w-full h-full">
          <h1 className="scroll-m-20 mb-2 text-2xl font-extrabold tracking-tight lg:text-5xl">
            Purchase Payment
          </h1>
          <PaymentPurchase purchase_code={purchaseCode} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
