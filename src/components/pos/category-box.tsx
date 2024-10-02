'use client';

import React, { useEffect, useState } from 'react';

interface CategoryBoxProps {
  categories: string[];
  onSelectedCategory: (category: string) => void; 
}

export default function CategoryBox({ categories, onSelectedCategory }: CategoryBoxProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("beauty");

  useEffect(() => {
    onSelectedCategory(selectedCategory);
  }, [selectedCategory, onSelectedCategory]);

  return (
    <div className="my-2 h-64 w-[55vw] overflow-y-auto grid grid-rows-3 grid-flow-col gap-2">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "p-2 w-28 rounded-md bg-slate-200"
              : "p-2 w-28 rounded-md bg-slate-100"
          }
          onClick={() => setSelectedCategory(category)} // Select one category at a time
        >
          <p>{category}</p>
        </button>
      ))}
    </div>
  );
}
