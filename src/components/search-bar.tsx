import React, { useState } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { Item } from '@/lib/Types';

export default function SearchBar({items}: {items: Item[]}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = 
        searchQuery === ""
            ? items
            : items.filter((item) => (
                item.name.toLowerCase()
                .replace(/\s+/g, "")
                .includes(searchQuery.toLowerCase().replace(/\s+/g, ""))
            ));
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="relative rounded-lg bg-gray-100 dark:bg-gray-800 w-48">
          <Input type="text" placeholder="Search" className="rounded-lg appearance-none w-48 pl-8 text-xs" />
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-600" />
        </div>
      </div>
    </div>
  )
}
