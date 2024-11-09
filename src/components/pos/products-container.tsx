"use client";
import { selectedItemsAtom } from "@/lib/jotai";
import { Item } from "@/types";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/currency.util";
import { myImageLoader } from "@/utils/util";
import { useAtom } from "jotai";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ProductsContainer({ products }: { products: Product[] }) {
  const [selectedProducts, setSelectedProducts] = useAtom(selectedItemsAtom);

  const handleAddItem = (product: Product, qty: number) => {
    const item = new Item();
    Object.assign(item, product);
    setSelectedProducts((prevItems) => {
      const exixtingItem = prevItems.find((i) => i.id === item.id);
      if (exixtingItem && (exixtingItem?.quantity ?? 0) < qty) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, max_qty: qty, quantity: (i.quantity ?? 0) + 1 }
            : i
        );
      } else if (!exixtingItem) {
        return [...prevItems, { ...item, quantity: 1 }];
      } else {
        return [...prevItems];
      }
    });
  };

  const handleRemoveItem = (product: Product) => {
    const item = new Item();
    Object.assign(item, product);
    setSelectedProducts((prevItems) => {
      const exixtingItem = prevItems.find((i) => i.id === item.id);
      if (exixtingItem && (exixtingItem.quantity ?? 0) > 1) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity ?? 0) - 1 } : i
        );
      } else {
        return prevItems.filter((i) => i.id !== item.id);
      }
    });
  };

  return (
    <div className="h-full overflow-y-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {products.length > 0 ? (
        <>
          {products.map((product: Product) => {
            if (!product.inventory) return null;
            return (
              <div
                key={product.id}
                className="p-2 pt-0 h-fit w-full flex flex-col items-center text-center justify-between rounded-md shadow hover:shadow-inner border border-slate-200"
              >
                <button
                  className="text-center h-2/3 flex flex-col items-center"
                  onClick={() =>
                    handleAddItem(product, product?.inventory?.qty as number)
                  }
                >
                  <div className="relative h-20">
                    <Image height={80} width={80} loader={myImageLoader} className="max-h-20" src={product.image ?? "https://picsum.photos/200"} alt="product" />
                  </div>
                  <p className="text-sm line-clamp-1 font-bold">{product.name}</p>
                  <p className="text-xs">
                    {formatPrice(Number(product.sellPrice))}
                  </p>
                </button>
                <div className="flex bg-white rounded-md gap-3 p-2 items-center self-end">
                  <button
                    onClick={() =>
                      handleAddItem(product, product?.inventory?.qty as number)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <p className="w-4 text-center text-sm">
                    {selectedProducts.find((i) => i.id === product.id)
                      ?.quantity || 0}
                  </p>
                  <button onClick={() => handleRemoveItem(product)}>
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
