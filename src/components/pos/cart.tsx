"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { useAtom, useAtomValue } from "jotai";
import { selectedItemsAtom } from "@/lib/jotai";
import { formatPrice } from "@/utils/currency.util";
import { CreateSaleDto, CreateSaleItemDto } from "./create-sale.dto";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";
import { AxiosError } from "axios";
import { Minus, Plus, Trash } from "lucide-react";
import { Item } from "@/types";

interface ErrorResponse {
  message: string;
}
export default function Cart({
  setTab,
  setSaleCode,
}: {
  setTab: Dispatch<SetStateAction<"sale" | "payment">>;
  setSaleCode: Dispatch<SetStateAction<string>>;
}) {
  const [selectedItems, setSelectedItems] = useAtom(selectedItemsAtom);
  const toast = useToast();
  const subTotal = selectedItems.reduce(
    (acc, item) => acc + item.sellPrice * item.quantity,
    0
  );

  function handlePay() {
    if (selectedItems.length === 0) {
      toast.toast({
        title: "Error",
        description: "Please select items",
        variant: "destructive",
      });
      return;
    }
    const createSaleDto: CreateSaleDto = new CreateSaleDto();

    createSaleDto.date = new Date();
    createSaleDto.sale_items = selectedItems.map((item) => {
      const createSaleItemDto: CreateSaleItemDto = new CreateSaleItemDto();
      createSaleItemDto.product_id = item.id;
      createSaleItemDto.qty = item.quantity;
      createSaleItemDto.price = Number(item.sellPrice);
      return createSaleItemDto;
    });
    axiosInstance
      .post(API_ENDPOINT.CREATE_SALE, createSaleDto)
      .then((res) => {
        setSelectedItems([]);
        setSaleCode(res.data.code);
        setTab("payment");
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        if (err.response?.data) {
          toast.toast({
            title: "Error",
            description: String(err.response?.data?.message),
          });
        }
      });
  }

  const handleAdd = (item: Item) => {
    setSelectedItems((prevItems) => {
      const exixtingItem = prevItems.find((i) => i.id === item.id);
      if (exixtingItem && exixtingItem.quantity < item.max_qty) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else if (!exixtingItem) {
        return [...prevItems, { ...item, quantity: 1 }];
      } else {
        return [...prevItems];
      }
    });
  };

  const handleReduce = (item: Item) => {
    setSelectedItems((prevItems) => {
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
  const handleRemove = (item: Item) => {
    setSelectedItems((prevItems) => {
      return prevItems.filter((i) => i.id !== item.id);
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-2 max-h-full overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {selectedItems.map((item, index) => (
            <li
              key={item.id}
              className="flex p-2 justify-between items-center bg-slate-200 rounded-md"
            >
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    handleRemove(item);
                  }}
                  className="p-1 w-6 h-6 text-xs text-center rounded-full bg-white "
                >
                  <Trash className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    handleReduce(item);
                  }}
                  className="p-1 w-6 h-6 text-xs text-center rounded-full bg-white "
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    handleAdd(item);
                  }}
                  className="p-1 w-6 h-6 text-xs text-center rounded-full bg-white "
                >
                  <Plus className="w-4 h-4" />
                </button>
                <p>{item.name}</p>
                <p className="text-sm text-slate-500">x{item.quantity}</p>
              </div>
              <p>Rp.{formatPrice(item.sellPrice * item.quantity)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 flex flex-1 flex-col justify-between rounded-md bg-slate-200">
        {selectedItems.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p>SubTotal</p>
              <p>Rp.{formatPrice(subTotal)}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount</p>
              <p>Rp.0</p>
            </div>
            <div className="border-b-2 border-dashed border-black" />
            <div className="flex justify-between text-lg font-bold">
              <p>Total</p>
              <p>Rp.{formatPrice(subTotal)}</p>
            </div>
          </div>
        ) : (
          <p>No item</p>
        )}
        <div>
          <button
            onClick={handlePay}
            className="mt-4 w-full bg-slate-500 text-white rounded-full p-2 hover:bg-black"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
