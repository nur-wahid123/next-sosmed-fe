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
  const [selectedCategory, setSelectedCategory] = useState<number>(3);

  useEffect(() => {
    onSelectedCategory(selectedCategory);
  }, [selectedCategory, onSelectedCategory]);

  return (
    <div className="overflow-y-auto grid grid-rows-3 grid-flow-col gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          className={
            selectedCategory === category.id
              ? "p-2  rounded-md bg-slate-200"
              : "p-2  rounded-md bg-slate-100"
          }
          onClick={() => setSelectedCategory(category.id)} // Select one category at a time
        >
          <p>{toTitleCase(category.name)}</p>
        </button>
      ))}
    </div>
  );
}
