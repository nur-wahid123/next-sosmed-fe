import CategoryBox from '@/components/pos/category-box'
import SearchBar from '@/components/search-bar'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import React from 'react'

export default function POSPage() {
  return (
    <div className='flex gap-2 p-2 w-full h-full'>
        <div className='flex-1 w-full'>
            <SearchBar/>
            <CategoryBox/>
            <Separator />
        </div>
        <div className='w-1/3 flex flex-col gap-2'>
           <div>
            <ul className='flex flex-col gap-2'>
                <li className='flex p-2 justify-between items-center bg-slate-200 rounded-md'>
                    <div className='flex gap-2 items-center'>
                        <p className='p-1 w-6 h-6 text-xs text-center rounded-full bg-white '>
                            1
                        </p>
                        <p>Soy Sauce</p>
                        <p className='text-sm text-slate-500'>x1</p>
                    </div>

                    <p>Rp.20000</p>
                </li>
                <li className='flex p-2 justify-between items-center bg-slate-200 rounded-md'>
                    <div className='flex gap-2 items-center'>
                        <p className='p-1 w-6 h-6 text-xs text-center rounded-full bg-white '>
                            2
                        </p>
                        <p>Gerih</p>
                        <p className='text-sm text-slate-500'>x3</p>
                    </div>

                    <p>Rp.15000</p>
                </li>
            </ul>
           </div>

           <div className='p-2 pt-4 flex flex-1 flex-col justify-between rounded-md bg-slate-200'>
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
    </div>
  )
}
