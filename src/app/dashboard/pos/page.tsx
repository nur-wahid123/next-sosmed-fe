import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default function POSPage() {
  return (
    <div className='flex gap-2 p-2 w-full h-full'>
        <div className='flex-1 bg-slate-400'>
            <p>items</p>
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
                    <p>Payment</p>
                </div>
           </div>
        </div>
    </div>
  )
}
