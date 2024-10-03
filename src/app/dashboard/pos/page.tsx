"use client"
import CategoryBox from '@/components/pos/category-box'
import SearchBar from '@/components/search-bar'
import { Separator } from '@/components/ui/separator'
import Cart from '@/components/pos/cart'
import ProductsContainer from '@/components/pos/products-container'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import API_ENDPOINT from '../../../../config/endpoint'

export default function POSPage() {
  const [ products, setProducts ] = useState([])
  const [ categories, setCategories ] = useState([])

  useEffect(() => {
    const fetchCategoriesData = async () => {
      await axios.get(`${API_ENDPOINT.DUMMY}/products/category-list`).then((res) => {
        setCategories(res.data)
      });
    }
    fetchCategoriesData()
  }, [])

  const handleSearch = useCallback(async (query: string) => {
    await axios.get(`${API_ENDPOINT.DUMMY}/products/search?q=${query}`).then((res) => {
      setProducts(res.data)
    });
  }, []);

  const handleSelectedCategory = useCallback(async (category: string) => {
    await axios.get(`${API_ENDPOINT.DUMMY}/products/category/${category}`).then((res) => {
      setProducts(res.data.products)
    });
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
