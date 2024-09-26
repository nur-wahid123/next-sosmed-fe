"use client"
import React, { useState } from 'react'
import { useAtom } from 'jotai'
import { Item } from '@/lib/Types';
import { selectedItemsAtom } from '@/lib/jotai';
import { SquareMinus, SquarePlus } from 'lucide-react';

const items = [
    {
        id: 1,
        name: "Item 1",
        price: 10000,
        quantity: 0,
        category: "food"
    },
    {
        id: 2,
        name: "Item 2",
        price: 20000,
        quantity: 0,
        category: "food"
    },
    {
        id: 3,
        name: "Item 3",
        price: 30000,
        quantity: 0,
        category: "drinks"
    },
    {
        id: 4,
        name: "Item 4",
        price: 40000,
        quantity: 0,
        category: "snack"
    },
    {
        id: 5,
        name: "Item 5",
        price: 50000,
        quantity: 0,
        category: "snack"
    },
    {
        id: 6,
        name: "Item 6",
        price: 60000,
        quantity: 0,
        category: "others"
    },
    {
        id: 7,
        name: "Item 7",
        price: 70000,
        quantity: 0,
        category: "others"
    },
    {
        id: 8,
        name: "Item 8",
        price: 80000,
        quantity: 0,
        category: "others"
    },
    {
        id: 9,
        name: "Item 9",
        price: 90000,
        quantity: 0,
        category: "others"
    },
    {
        id: 10,
        name: "Item 10",
        price: 100000,
        quantity: 0,
        category: "others"
    },
    {
        id: 11,
        name: "Item 11",
        price: 110000,
        quantity: 0,
        category: "others"
    },
    {
        id: 12,
        name: "Item 12",
        price: 120000,
        quantity: 0,
        category: "others"
    },
]

export default function ItemsBox() {
    const [selectedItems, setSelectedItems] = useAtom(selectedItemsAtom);

    const handleAddItem = (item: Item) => {
        setSelectedItems((prevItems) => {
            const exixtingItem = prevItems.find((i) => i.id === item.id);
            if (exixtingItem) {
                return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    }

    const handleRemoveItem = (item: Item) => {
        setSelectedItems((prevItems) => {
            const exixtingItem = prevItems.find((i) => i.id === item.id);
            if (exixtingItem && exixtingItem.quantity > 1) {
                return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i));
            } else {
                return prevItems.filter((i) => i.id !== item.id);
            }
        });
    }
  return (
    <div className="my-2 w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {items.map((item) => (
        <div 
            key={item.name} 
            className="p-2 pt-0 h-28 w-full flex flex-col justify-between rounded-md bg-slate-100"
        >
          <button className='text-left  h-2/3' onClick={() => handleAddItem(item)}>
            <p>{item.name}</p>
            <p className='text-sm'>Rp.{item.price}</p>
          </button>
          <div className='flex items-center self-end'>
            <button onClick={() => handleAddItem(item)}>
                <SquarePlus />
            </button>
            <p className='w-4 text-center text-sm'>{selectedItems.find((i) => i.id === item.id)?.quantity || 0}</p>
            <button onClick={() => handleRemoveItem(item)}>
                <SquareMinus />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}