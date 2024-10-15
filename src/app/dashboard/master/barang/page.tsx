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
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  Row,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}
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
export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const nameFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
    const { name, code } = row.getValue<{ name: string; code: string }>(
      columnId
    );
    if (name.toLowerCase().includes(filterValue.toLowerCase())) {
      return name.toLowerCase().includes(filterValue.toLowerCase());
    } else {
      return code.toLowerCase().includes(filterValue.toLowerCase());
    }
  };
  const [products, setProducts] = React.useState<Product[]>([]);
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
        filterFn: nameFilterFn,
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

  const table = useReactTable({
    data: products,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  function fetchData() {
    axiosInstance.get(API_ENDPOINT.PRODUCT_LIST).then((res) => {
      if (Array.isArray(res.data)) {
        const p: Product[] = [];
        res.data.map((data) => {
          p.push(
            mapResponseToClass(data, Product, {
              name: "name",
            })
          );
        });

        setProducts(p);
      }
    });
    axiosInstance.get(API_ENDPOINT.CATEGORY_LIST).then((res) => {
      if (Array.isArray(res.data)) {
        const p: Category[] = [];
        res.data.map((data, i) => {
          //   if (i > 9) return;
          p.push(
            mapResponseToClass(data, Category, {
              name: "name",
            })
          );
          //   return mapResponseToClass(data, Product);
        });

        // console.log(p);
        setCategories(p);
      }
    });
  }
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);
  return (
    <div>
      <h1 className="scroll-m-20 m-4 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Barang
      </h1>
      <div className="p-2">
        <div className="h-2" />
        <div className="flex items-center gap-2">
          <Button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <span>{table.getPrePaginationRowModel().rows.length} Rows</span>
        </div>
      </div>
      <Table>
        <TableCaption>List Barang</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "flex items-center gap-2 cursor-pointer select-none"
                              : "flex items-center gap-2 ",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ArrowUp />,
                            desc: <ArrowDown />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter
                              categories={categories}
                              column={header.column}
                            />
                          </div>
                        ) : null}
                      </>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
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
  );
}

function Filter({
  column,
  categories,
}: {
  column: Column<any, unknown>;
  categories: Category[];
}) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      {categories.map((category) => (
        <option value={toTitleCase(category.name as string)}>
          {toTitleCase(category.name as string)}
        </option>
      ))}
    </select>
  ) : (
    <DebouncedInput
      className="w-36 border shadow rounded"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
