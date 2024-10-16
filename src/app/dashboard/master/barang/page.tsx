"use client";
import {
  Table,
  TableBody,
  TableCaption,
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
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  keepPreviousData,
  QueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
export class Product {
  id?: number = 0;
  name?: string = "";
  code?: string = "";
  sellPrice?: number = 0;
  category?: { name: string } = { name: "" };
  uom?: { name: string } = { name: "" };
  inventory?: { qty: number } = { qty: 0 };
}
export class Category {
  name?: string = "";
}

const fetchSize = 20;

export default function Page() {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columns = React.useMemo<ColumnDef<Product, any>[]>(
    () => [
      {
        accessorKey: "product",
        header: "Product",
        accessorFn: (row) => ({
          name: row.name,
          code: row.code,
        }),
        cell: (info) => {
          const { name, code } = info.getValue();
          return (
            <div>
              <div className="font-light text-slate-700">{code}</div>
              <div className="font-semibold">{name}</div>
            </div>
          );
        },
        meta: {
          filterVariant: "text",
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (info) => info.getValue(),
        accessorFn: (row) => toTitleCase(row.category?.name as string),
        meta: {
          filterVariant: "select",
        },
      },
    ],
    []
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchData(
    start: number,
    limit: number,
    sorting: SortingState
  ): Promise<{ data: Product[]; meta: { itemCount: number } }> {
    const p: Product[] = [];
    let itemCount = 0;

    try {
      const res = await axiosInstance.get(
        `${API_ENDPOINT.PRODUCT_LIST}?page=${start}&take=${limit}`
      );

      if (Array.isArray(res.data.data)) {
        res.data.data.forEach((data: any) => {
          p.push(
            mapResponseToClass(data, Product, {
              name: "name",
            })
          );
        });
      }
      if (res.data.pagination.itemCount) {
        itemCount = res.data.pagination.itemCount ?? 0;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    if (sorting.length) {
      const sort = sorting[0] as ColumnSort
      const { id, desc } = sort as { id: keyof Product; desc: boolean }
      p.sort((a, b) => {
          if (desc) {
            return a[id] < b[id] ? 1 : -1
          }
          return a[id] > b[id] ? 1 : -1
      })
    }

    const a = {
      data: p,
      meta: {
        itemCount,
      },
    };
    return a;
  }
  useEffect(() => {
    // fetchData(1, fetchSize);
    // fetchNextPage();
    return () => {};
  }, []);

  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: [
      "product",
      sorting, //refetch when sorting changes
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const start = pageParam as number;
      const fetchedData = await fetchData(start, fetchSize,sorting); //pretend api call
      return fetchedData;
    },
    initialPageParam: 1,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  //flatten the array of arrays from the useInfiniteQuery hook
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );
  const totalDBRowCount = data?.pages?.[0]?.meta?.itemCount ?? 0;
  const totalFetched = flatData.length;

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
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
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: false,
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
      <div className="w-full">
        ({flatData.length} of {totalDBRowCount} rows fetched)
        <div
          className="w-full"
          onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
          ref={tableContainerRef}
          style={{
            overflow: "auto", //our scrollable table container
            position: "relative", //needed for sticky header
            height: "600px", //should be a fixed height
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
