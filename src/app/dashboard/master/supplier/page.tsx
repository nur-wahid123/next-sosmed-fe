"use client";
import { Filter, TanstackTable } from "@/utils/util-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../../../config/endpoint";
import React, { useEffect, useState } from "react";
import { mapResponseToClass, toTitleCase } from "@/utils/util";
import { formatPrice } from "@/utils/currency.util";
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  OnChangeFn,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";

import AddProduct from "@/components/product/add-product.components";
import { Product } from "@/types/product";
import SearchBar from "@/components/search-bar";
import useDebounce from "@/hooks/useDebounce";

export class Category {
  name?: string = "";
  id?: number = 0;
}

const fetchSize = 20;

function productFilterFn<TData, TValue>(
  row: Row<TData>,
  columnId: string,
  value: TValue
) {
  const { name, code } = row.getValue<{ name: string, code: string }>(columnId);
  return name.toLowerCase().includes((value as string).toLowerCase()) || code.toLowerCase().includes((value as string).toLowerCase());
}


export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search, 500);
  const columns = React.useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        accessorKey: "product",
        header: "Product",
        accessorFn: (row) => ({
          name: row.name,
          code: row.code,
        }),
        filterFn: productFilterFn,
        cell: (info) => {
          const { name, code } = info.getValue();
          return (
            <div>
              <div className="font-light text-slate-700">{code}</div>
              <div className="font-semibold">{name}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (info) => info.getValue(),
        accessorFn: (row) => toTitleCase(row.category?.name as string),
      },
      {
        accessorKey: "sellPrice",
        header: "Sell Price",
        cell: (info) => {
          const sellPrice = info.getValue();
          return formatPrice(sellPrice);
        },
        accessorFn: (row) => row.sellPrice as number,
      },
      {
        accessorKey: "brands",
        header: "Merek",
        cell: (info) => {
          return info.getValue();
        },
        accessorFn: (row) => row.brand?.name as string,
      }
    ],
    []
  );

  async function fetchData(
    start: number,
    limit: number,
    sorting: SortingState
  ) {

    try {
      const res = await axiosInstance.get(
        `${API_ENDPOINT.PRODUCT_LIST}?page=${start}&take=${limit}&search=${search}`
      );

      if (res.data) {
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching :", error);
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: [
      "product",
      "search",
      search,
      sorting, //refetch when sorting changes
    ],
    queryFn: async ({ pageParam }) => {
      const fetchedData = await fetchData(pageParam + 1, fetchSize, sorting); //pretend api call
      return fetchedData;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  //flatten the array of arrays from the useInfiniteQuery hook
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page?.data) ?? [],
    [data]
  );

  if (isLoading) {
    return <>Loading...</>;
  }


  function handleSearch(search:string){
    setSearch(search);
  }
  

  return (
    <div>
      <h1 className="scroll-m-20 m-4 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Supplier
      </h1>
      <div className="flex w-full justify-between mb-6">
      {/* <Filter column={table.getColumn("product")} /> */}
      <SearchBar onSearch={handleSearch}/>
      <AddProduct />
      </div>
      <TanstackTable columns={columns} infiniteScroll={{ fetchNextPage: fetchNextPage, isFetching, hasNextPage }} data={flatData} fetchSize={fetchSize}>
      </TanstackTable>
    </div>
  );
}
