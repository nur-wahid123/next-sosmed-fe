import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default function POSPage() {
  return (
    <div className='flex p-2 w-full'>
        <div className='w-2/3'>
            <p>items</p>
        </div>
        <div className='w-1/2 h-full'>
            <Card>
                <CardHeader>
                    <CardDescription>Bill</CardDescription>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <div>
                        <div className='flex w-full justify-between'>
                            <p className='font-semibold'>Item 2</p>
                            <p className='font-semibold text-slate-500'>Rp.2000</p>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <div className='flex w-full justify-between'>
                                <p className='font-semibold'>Subtotal</p>
                                <p className='font-semibold text-emerald-400'>Rp.2000</p>
                        </div>
                        <div className='flex w-full justify-between'>
                                <p className='font-bold'>Total</p>
                                <p className='font-semibold text-emerald-800'>Rp.2000</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
