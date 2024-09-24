import React from 'react'

const categories = ['Food', 'Drink', 'Snack', 'Others', 'New Product', 'Anothers', 'lorem'];

export default function CategoryBox() {
  return (
    <div className="my-2 w-full grid grid-cols-4 gap-2">
      {categories.map((category) => (
        <button key={category} className="p-2 rounded-md bg-slate-100">
          <p>{category}</p>
        </button>
      ))}
    </div>
  );
}

