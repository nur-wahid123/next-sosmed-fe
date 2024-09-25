"use client"
import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '../../components/ui/toggle-group'
import { useAtomValue } from 'jotai'
import { selectedItemsAtom } from '@/lib/jotai';
export default function Cart() {
    const selectedItems = useAtomValue(selectedItemsAtom);
  return (
    <div className='flex flex-col gap-2 h-full'>
           <div className='max-h-[55vh] overflow-y-auto'>
            <ul className='flex flex-col gap-2'>
                {selectedItems.map((item, index) => (
                    <li key={item.name} className='flex p-2 justify-between items-center bg-slate-200 rounded-md'>
                        <div className='flex gap-2 items-center'>
                            <p className='p-1 w-6 h-6 text-xs text-center rounded-full bg-white '>
                                {index + 1}
                            </p>
                            <p>{item.name}</p>
                            <p className='text-sm text-slate-500'>x{item.quantity}</p>
                        </div>
                        <p>Rp.{item.price * item.quantity}</p>
                    </li>
                ))}
            </ul>
           </div>

           <div className='p-2 pt-4 flex flex-1 flex-col justify-between rounded-md bg-slate-200'>
                {selectedItems.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between'>
                            <p>SubTotal</p>
                            <p>Rp.45000</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Discount</p>
                            <p>Rp.0</p>
                        </div>
                        <div className="border-b-2 border-dashed border-black" />
                        <div className='flex justify-between text-lg font-bold'>
                            <p>Total</p>
                            <p>Rp.45000</p>
                        </div>
                    </div>
                ):(
                    <p>No item</p>
                )}
                <div>
                    <p className='my-2 text-sm'>Payment Method</p>
                    <ToggleGroup type="single" defaultValue="cash" variant="outline">
                        <ToggleGroupItem value="cash" aria-label="Cash" className='flex-1'>
                            <p>CASH</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="bon" aria-label="Bon" className='flex-1'>
                            <p>BON</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="qris" aria-label="QRIS" className='flex-1'>
                            <p>QRIS</p>
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <button className='mt-4 w-full bg-slate-500 text-white rounded-full p-2 hover:bg-black'>Pay</button>
                </div>
           </div>
        </div>
  )
}
