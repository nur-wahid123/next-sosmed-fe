"use client";
import { selectedItemsAtom } from "@/lib/jotai";
import { Item } from "@/types";
import { formatPrice } from "@/utils/currency.util";
import { useAtom } from "jotai";
import { Minus, Plus } from "lucide-react";
import React from "react";

export default function ProductsContainer({ products }: { products: Item[] }) {
  const [selectedProducts, setSelectedProducts] = useAtom(selectedItemsAtom);

  const handleAddItem = (item: Item, qty: number) => {
    setSelectedProducts((prevItems) => {
      const exixtingItem = prevItems.find((i) => i.id === item.id);
      if (exixtingItem && exixtingItem.quantity < qty) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, max_qty: qty, quantity: i.quantity + 1 }
            : i
        );
      } else if (!exixtingItem) {
        return [...prevItems, { ...item, quantity: 1 }];
      } else {
        return [...prevItems];
      }
    });
  };

  const handleRemoveItem = (item: Item) => {
    setSelectedProducts((prevItems) => {
      const exixtingItem = prevItems.find((i) => i.id === item.id);
      if (exixtingItem && exixtingItem.quantity > 1) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
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
          {products.map((product: any) => {
            if (!product.inventory) return null;
            return (
              <div
                key={product.id}
                className="p-2 pt-0 h-28 w-full flex flex-col justify-between rounded-md bg-slate-100"
              >
                <button
                  className="text-left h-2/3"
                  onClick={() =>
                    handleAddItem(product, product.inventory.qty as number)
                  }
                >
                  <p className="text-sm">{product.name}</p>
                  <p className="text-xs">
                    {formatPrice(Number(product.sellPrice))}
                  </p>
                </button>
                <div className="flex bg-white rounded-md p-2 items-center self-end">
                  <button
                    onClick={() =>
                      handleAddItem(product, product.inventory.qty as number)
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
