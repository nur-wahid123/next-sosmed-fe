"use client";
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';


export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
    } 
  }, [debouncedQuery, onSearch]);

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="relative rounded-lg bg-gray-100 dark:bg-gray-800 w-48">
          <Input
            type="text"
            placeholder="Search"
            className="rounded-lg appearance-none w-48 pl-8 text-xs"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-600" />
        </div>
      </div>
    </div>
  );
}
