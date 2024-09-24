"use client"
import React, { useState } from 'react'
import { useAtom } from 'jotai'
import { Item } from '@/lib/Types';
import { selectedItemsAtom } from '@/lib/jotai';
import { Minus, Plus } from 'lucide-react';

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
        // console.log(selectedItems);
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
            <p>Rp.{item.price}</p>
          </button>
          <div className='flex self-end'>
            <Plus />
            <p className='self-end'>{selectedItems.find((i) => i.id === item.id)?.quantity || 0}</p>
            <Minus />
          </div>
        </div>
      ))}
    </div>
  )
}
