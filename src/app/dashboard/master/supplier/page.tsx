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

import useDebounce from "@/hooks/useDebounce";
import AddProduct from "@/components/product/add-product.components";
import { Product } from "@/type/product";

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
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
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
  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const debounceFunc = useDebounce(search, 500);

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

  const { data, fetchNextPage, hasNextPage , isFetching, isLoading } = useInfiniteQuery({
    queryKey: [
      "product",
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


  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          hasNextPage
        ) {
          fetchNextPage();
        }
      }
    },
    [isFetching, hasNextPage, fetchNextPage]
  );

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  React.useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    debugTable: true,
  });

  //scroll to top of table when sorting changes
  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    setSorting(updater);
    if (!!table.getRowModel().rows.length) {
      rowVirtualizer.scrollToIndex?.(0);
    }
  };

  //since this table option is derived from table row model state, we're using the table.setOptions utility
  table.setOptions((prev) => ({
    ...prev,
    onSortingChange: handleSortingChange,
  }));

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
        navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  if (isLoading) {
    return <>Loading...</>;
  }


  return (
    <div>
      <h1 className="scroll-m-20 m-4 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Barang
      </h1>
          <Filter column={table.getColumn("product")} />
          <AddProduct />
      <TanstackTable columns={columns} infiniteScroll={{ fetchNextPage: fetchNextPage,isFetching,hasNextPage }} data={flatData} fetchSize={fetchSize}>

      </TanstackTable>
      <div className="w-full flex flex-col gap-4">
        {/* ({flatData.length} of {totalDBRowCount} rows fetched) */}
        <div className="flex gap-6 items-center justify-between">
        </div>
        <div
          className="w-full"
          onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
          ref={tableContainerRef}
          style={{
            overflow: "auto", //our scrollable table container
            position: "relative", //needed for sticky header
            height: "200px", //should be a fixed height
          }}
        >
          {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
          <Table style={{ display: "grid" }}>
            <TableHeader
              style={{
                display: "grid",
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
              }}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  style={{ display: "flex", width: "100%" }}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody
              style={{
                display: "grid",
                height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                position: "relative", //needed for absolute positioning of rows
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<Product>;
                return (
                  <TableRow
                    data-index={virtualRow.index} //needed for dynamic row height measurement
                    ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
                    key={row.id}
                    style={{
                      display: "flex",
                      position: "absolute",
                      transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                      width: "100%",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            display: "flex",
                            width: "100%",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {isFetching && <div>Fetching More...</div>}
      </div>
    </div>
  );
}
