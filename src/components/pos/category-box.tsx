"use client";

import { toTitleCase } from "@/utils/util";
import React, { useEffect, useState } from "react";

interface CategoryBoxProps {
  categories: { id: number; name: string }[];
  onSelectedCategory: (category: number) => void;
}

export default function CategoryBox({
  categories,
  onSelectedCategory,
}: CategoryBoxProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  useEffect(() => {
    onSelectedCategory(selectedCategory);
  }, [selectedCategory, onSelectedCategory]);

  return (
    <div className="overflow-y-auto flex p-2 border-b-2 gap-2 scrollbar-hidden">
        <button
          className={
            `${selectedCategory === 0
              ? "px-2 py-1  rounded-md bg-black text-white"
              : "px-2 py-1  rounded-md "} shadow hover:shadow-inner w-fit border border-slate-200`
          }
          onClick={() => setSelectedCategory(0)} // Select one category at a time
        >
          <p className="text-nowrap">{toTitleCase('All')}</p>
        </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={
            `${selectedCategory === category.id
              ? "px-2 py-1  rounded-md bg-black text-white"
              : "px-2 py-1  rounded-md "} shadow hover:shadow-inner w-fit border border-slate-200`
          }
          onClick={() => setSelectedCategory(category.id)} // Select one category at a time
        >
          <p className="text-nowrap">{toTitleCase(category.name)}</p>
        </button>
      ))}
    </div>
  );
}
