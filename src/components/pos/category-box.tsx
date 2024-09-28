"use client"
import React from 'react'

// const categories = ['Food', 'Drink', 'Snack', 'Others', 'New Product', 'Anothers', 'lorem'];

export default function CategoryBox({ categories}: { categories: string[] }) {
  console.log(categories)
  const handleClick = (category: string) => {
    console.log(category)
  }

  return (
    <div className="my-2 h-64 w-[55vw] overflow-y-auto grid grid-rows-3 grid-flow-col gap-2">
      {categories.map((category: string) => (
        <button key={category} className="p-2 w-28 rounded-md bg-slate-100" onClick={() => handleClick(category)}>
          <p>{category}</p>
        </button>
      ))}
    </div>
  );
}

