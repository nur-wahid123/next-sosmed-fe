"use client";
import { selectedItemsAtom } from '@/lib/jotai';
import { fetchProducts, fetchProductsByCategory } from '@/services/api';
import { Item } from '@/types';
import { useAtom } from 'jotai';
import { SquareMinus, SquarePlus } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ProductsContainer() {
   const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedProducts, setSelectedProducts] = useAtom(selectedItemsAtom);

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
            setProducts(products);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleAddItem = (item: Item) => {
        setSelectedProducts((prevItems) => {
            const exixtingItem = prevItems.find((i) => i.id === item.id);
            if (exixtingItem) {
                return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    }

    const handleRemoveItem = (item: Item) => {
        setSelectedProducts((prevItems) => {
            const exixtingItem = prevItems.find((i) => i.id === item.id);
            if (exixtingItem && exixtingItem.quantity > 1) {
                return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i));
            } else {
                return prevItems.filter((i) => i.id !== item.id);
            }
        });
    }

  return (
    <div className="my-2 h-[56vh] overflow-y-auto w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {loading ? (
            <p>Loading...</p>
        ): error ? (
            <p>{error}</p>
        ): products.length > 0 ? (
            <>
                {products.map((product: any) => (
                    <div 
                        key={product.id} 
                        className="p-2 pt-0 h-28 w-full flex flex-col justify-between rounded-md bg-slate-100"
                    >
                        <button className='text-left h-2/3' onClick={() => handleAddItem(product)}>
                            <p className='text-sm'>{product.title}</p>
                            <p className='text-xs'>{product.price}</p>
                        </button>
                        <div className='flex items-center self-end'>
                            <button onClick={() => handleAddItem(product)}>
                                <SquarePlus />
                            </button>
                            <p className='w-4 text-center text-sm'>{selectedProducts.find((i) => i.id === product.id)?.quantity || 0}</p>
                            <button onClick={() => handleRemoveItem(product)}>
                                <SquareMinus />
                            </button>
                        </div>
                    </div>
                ))}
            </>
        ): (
            <p>No products found</p>
        )}
    </div>
  )
}
