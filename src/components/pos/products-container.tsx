"use client";
import { fetchProducts, fetchProductsByCategory } from '@/services/api';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ProductsContainer() {
   const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(search){
            fetchItems(search as string)
        } else if (category) {
            fetchItemsByCategory(category as string)
        } else {
            // fetchItemsByCategory("smartphones")
            setProducts([])
        }
        
    }, [search, category]);

    const fetchItems = async (searchQuery: string) => {
        setLoading(true);
        setError(null);
        try {
            const { products } = await fetchProducts(searchQuery);
            setProducts(products);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchItemsByCategory = async (category: string) => {
        setLoading(true);
        setError(null);
        try {
            const { products } = await fetchProductsByCategory(category);
            console.log(products)
            setProducts(products);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
        {loading ? (
            <p>Loading...</p>
        ): error ? (
            <p>{error}</p>
        ): products.length > 0 ? (
            <div>
                {products.map((product: any) => (
                    <div key={product.id}>
                        <p>{product.title}</p>
                    </div>
                ))}
            </div>
        ): (
            <p>No products found</p>
        )}
    </div>
  )
}
