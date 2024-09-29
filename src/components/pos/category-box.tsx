"use client"
import { fetchCategories } from '@/services/api';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

// const categories = ['Food', 'Drink', 'Snack', 'Others', 'New Product', 'Anothers', 'lorem'];

export default function CategoryBox() {
  const categoryParams = useSearchParams();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const category = categoryParams.get("category");

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    })
  },[])
  const handleClick = (category: string) => {
    router.push(`/dashboard/pos?category=${category}`)
  }

  return (
    <div className="my-2 h-64 w-[55vw] overflow-y-auto grid grid-rows-3 grid-flow-col gap-2">
      {categories.map((category: string) => (
        <button 
          key={category} 
          className={category === categoryParams.get("category") ? 
            "p-2 w-28 rounded-md bg-slate-700 text-white" 
            : "p-2 w-28 rounded-md bg-slate-100" }
          onClick={() => handleClick(category)}
        >
          <p>{category}</p>
        </button>
      ))}
    </div>
  );
}

