"use client";
import CategoryBox from "@/components/pos/category-box";
import SearchBar from "@/components/search-bar";
import { Separator } from "@/components/ui/separator";
import Cart from "@/components/pos/cart";
import ProductsContainer from "@/components/pos/products-container";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINT from "../../../../config/endpoint";
import axiosInstance from "@/utils/axios-util";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Payment from "@/components/pos/payment";
import PurchaseItemsTable from "@/components/pos/purchase-items.table";
import PaymentPurchase from "@/components/pos/payment-purchase";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [saleCode, setSaleCode] = useState<string>("");
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
        <div className="flex flex-col gap-4 items-start">
          <div className="flex h-full w-full gap-5">
            <PaymentPurchase />
            <PurchaseItemsTable />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="payment">
        <div className="w-full h-full">
          <h1 className="scroll-m-20 mb-2 text-2xl font-extrabold tracking-tight lg:text-5xl">
            Purchase Payment
          </h1>
        </div>
      </TabsContent>
    </Tabs>
  );
}
