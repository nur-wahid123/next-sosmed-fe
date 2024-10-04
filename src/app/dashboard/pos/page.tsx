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
    <div className='flex w-full h-full'>
        <div className='flex-1 w-full'>
            <SearchBar onSearch={handleSearch}/>
            <div className='my-2 w-[50vw]'>
              <CategoryBox 
                categories={categories} 
                onSelectedCategory={handleSelectedCategory}
              />
            </div>
            <Separator className='my-4'/>
            <div className='mr-2 h-[50vh]'>
              <ProductsContainer products={products}/>
            </div>
        </div>
        <div className='w-[25vw] xl:w-[20vw] h-[92vh]'>
            <Cart />
        </div>
    </div>
  )
}
