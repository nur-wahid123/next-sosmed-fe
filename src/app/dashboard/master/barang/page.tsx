"use client";

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
import { toTitleCase } from "@/utils/util";
import { formatPrice } from "@/utils/currency.util";
import useDebounce from "@/hooks/useDebounce";
import AddProduct from "@/components/product/add-product.components";
import SearchBar from "@/components/search-bar";
import PaginationSelf, { PaginateContentProps } from "@/components/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export class Product {
  id?: number = 0;
  name?: string = "";
  code?: string = "";
  sellPrice?: number = 0;
  brand?: { name: string } = { name: "" };
  category?: { name: string } = { name: "" };
  uom?: { name: string } = { name: "" };
  inventory?: { qty: number } = { qty: 0 };
}
export class Category {
  name?: string = "";
  id?: number = 0;
}


export default function Page() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginateContentProps>({});
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = React.useCallback(async (
    start: number,
    limit: number,
  ) => {
    try {
      const res = await axiosInstance.get(
        `${API_ENDPOINT.PRODUCT_LIST}?page=${start}&take=${limit}&search=${search}`
      );

      if (Array.isArray(res.data.data)) {
        setProducts(res.data.data);
      }
      if (res.data.pagination) {
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  , [search]);
  useEffect(() => {
    fetchData(pagination?.page ?? 1, pagination?.take ?? 20);
  }, [fetchData, pagination?.page, pagination?.take, search]);

  function handleSearch(query: string) {
    if (query.length > 0 && pagination.page !== 1) {
      setPagination({ ...pagination, page: 1 });
    }
    if (query !== search) {
      setSearch(query);
    }
  }

  return (
    <div>
      <h1 className="scroll-m-20 m-4 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Barang
      </h1>
      <div className="w-full flex flex-col gap-4">
        {/* ({flatData.length} of {totalDBRowCount} rows fetched) */}
        <div className="flex gap-6 items-center justify-between">
          <SearchBar onSearch={handleSearch} />
          <AddProduct />
          <div className="flex gap-4 items-center">
            <p>Rows</p>
            <Select value={pagination?.take?.toString()} onValueChange={(e) => setPagination({ ...pagination, take: Number(e),page:1 })}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Rows" />
              </SelectTrigger>
              <SelectContent>
                {[10,20,30,40,50].map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <PaginationSelf pagination={pagination} fetchData={fetchData} />
        </div>
        <div
          className="w-full"
          style={{
            height: "600px", //should be a fixed height
          }}
        >
          {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Merek</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{formatPrice(product?.sellPrice ?? 0)}</TableCell>
                  <TableCell>{toTitleCase(product.category?.name ?? "")}</TableCell>
                  <TableCell>{toTitleCase(product.brand?.name ?? "")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
