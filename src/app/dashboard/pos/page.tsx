// "use client"
import CategoryBox from '@/components/pos/category-box'
import SearchBar from '@/components/search-bar'
import { Separator } from '@/components/ui/separator'
import React, { useContext } from 'react'
import ItemsBox from '@/components/pos/items-box'
import Cart from '@/components/pos/cart'
import ProductsContainer from '@/components/pos/products-container'

export default function POSPage() {
  return (
    <div className='flex gap-2 p-2 w-full h-full'>
        <div className='flex-1 w-full'>
            <SearchBar />
            <CategoryBox />
            <Separator className='my-2'/>
            <ProductsContainer />
            {/* <ItemsBox/> */}
        </div>
        <div className='w-1/3 h-full'>
            <Cart />
        </div>
    </div>
  )
}
