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
import SearchBar from "@/components/search-bar";
import PaginationSelf, { PaginateContentProps } from "@/components/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatPrice } from "@/utils/currency.util";
import { Product } from "@/types/product";
import EditInventory from "@/components/inventory/edit-inventory.components";
import { CardsStats } from "@/components/inventory/card-stats.component";


export default function Page() {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<PaginateContentProps>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [dataType, setDataType] = useState<string>("all");
  const [stats, setStats] = React.useState<{
    all_product: number
    , total_item: number
    , value_of_products: number

  }>({
    all_product: 0
    , total_item: 0
    , value_of_products: 0
  });

  const fetchInventory = async (start: number, limit: number, search: string) => {
    const params = new URLSearchParams({
      page: start.toString(),
      take: limit.toString(),
      search: search,
      status: dataType
    });

    const res = await axiosInstance.get(`${API_ENDPOINT.GET_INVENTORY}?${params.toString()}`);
    return res;
  };

  const fetchData = React.useCallback(async (
    start: number,
    limit: number,
  ) => {
    try {
      const res = await fetchInventory(start, limit, search);

      if (Array.isArray(res.data.data)) {
        setProducts(res.data.data);
      }
      if (res.data.pagination) {
        setPagination(res.data.pagination);
      }
      try {
        const params = new URLSearchParams({
          search: search,
          status: dataType
        });
        const res = await axiosInstance.get(`${API_ENDPOINT.INVENTORY_INFORMATION}?${params.toString()}`);
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
    , [search, dataType]);

  useEffect(() => {
    fetchData(pagination?.page ?? 1, pagination?.take ?? 20);
  }, [fetchData, pagination?.page, pagination?.take, search,]);

  function handleSearch(query: string) {
    if (query !== search) {
      setPagination({ ...pagination, page: 1 })
      setSearch(query);
    }
  }

  function reFetech() {
    fetchData(pagination?.page ?? 1, pagination?.take ?? 20);
  }

  return (
    <div>
      <h1 className="scroll-m-20 m-4 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Stock
      </h1>
      <div className="w-full flex flex-col gap-4">
        {/* ({flatData.length} of {totalDBRowCount} rows fetched) */}
        <div className="flex gap-6 items-center justify-between">
          <SearchBar onSearch={handleSearch} />
          <div className="flex gap-4 items-center">
            <p>Rows</p>
            <Select value={pagination?.take?.toString()} onValueChange={(e) => setPagination({ ...pagination, take: Number(e), page: 1 })}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Rows" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dataType} onValueChange={(e) => setDataType(e)}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Rows" />
              </SelectTrigger>
              <SelectContent>
                {['all', '0', '>0',].map((item) => (
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
          <CardsStats data={stats} />
          {
            products.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-2xl font-semibold">No data found</p>
              </div>
            ) :
              (

                <Table>
                  <TableHeader className="bg-slate-100 text-black">
                    <TableRow>
                      <TableHead>Produk</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <p className="text-sm">{product.code}</p>
                          <p className="font-semibold text-lg">{product.name}</p>
                          <p className="text-sm font-light">{product.uom?.name}</p>
                        </TableCell>
                        <TableCell>
                          {product?.inventory?.qty ?? 0}
                        </TableCell>
                        <TableCell>{formatPrice(product.sellPrice ?? 0)}</TableCell>
                        <TableCell>{formatPrice((product.sellPrice ?? 0) * (product?.inventory?.qty ?? 0))}</TableCell>
                        <TableCell>
                          <EditInventory reFetch={reFetech} product={product} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
          }
        </div>
      </div>
    </div>
  );
}
