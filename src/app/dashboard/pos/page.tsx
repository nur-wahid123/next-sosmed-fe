"use client"
import CategoryBox from '@/components/pos/category-box'
import SearchBar from '@/components/search-bar'
import { Separator } from '@/components/ui/separator'
import Cart from '@/components/pos/cart'
import ProductsContainer from '@/components/pos/products-container'
import { fetchCategories, fetchProducts, fetchProductsByCategory } from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

export default function POSPage() {
  const [ products, setProducts ] = useState([])
  const [ categories, setCategories ] = useState([])

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const data = await fetchCategories()
      setCategories(data)
    }
    fetchCategoriesData()
  }, [])

  const handleSearch = useCallback(async (query: string) => {
    const data = await fetchProducts(query)
    setProducts(data.products)
  }, []);

  const handleSelectedCategory = useCallback(async (category: string) => {
    const data = await fetchProductsByCategory(category)
    setProducts(data.products)
    console.log(data)
  }, []);

  return (
    <div className='flex gap-2 p-2 w-full h-full'>
        <div className='flex-1 w-full'>
            <SearchBar onSearch={handleSearch}/>
            <CategoryBox 
              categories={categories} 
              onSelectedCategory={handleSelectedCategory}
            />
            <Separator className='my-4'/>
            <ProductsContainer products={products}/>
        </div>
        <div className='w-1/3 h-full'>
            <Cart />
        </div>
    </div>
  )
}
