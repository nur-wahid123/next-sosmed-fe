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
import { PaymentStatus } from "@/enums/payment-status.enum";
import { Badge } from "@/components/ui/badge";
import { Sale } from "@/types/sale";
import StatsSale from "@/components/sale/stats-sale.component";


export default function Page() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginateContentProps>({});
  const [sales, setSales] = useState<Sale[]>([]);
  const [stats, setStats] = useState<{all_sale:number, total:number, total_returns:number}>({all_sale:0, total:0, total_returns:0});

  const fetchData = React.useCallback(async (
    start: number,
    limit: number,
  ) => {
    try {
      const res = await axiosInstance.get(
        `${API_ENDPOINT.GET_SALE}?page=${start}&take=${limit}&search=${search}`
      );

      if (Array.isArray(res.data.data)) {
        setSales(res.data.data);
      }
      if (res.data.pagination) {
        setPagination(res.data.pagination);
      }
      const params = new URLSearchParams({
        search: search
      })
      const response = await axiosInstance.get(`${API_ENDPOINT.GET_SALE_INFORMATION}?${params.toString()}`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  , [search]);
  useEffect(() => {
    fetchData(pagination?.page ?? 1, pagination?.take ?? 20);
  }, [fetchData, pagination?.page, pagination?.take, search]);

  function handleSearch(query: string) {
    if (query !== search) {
      setPagination({...pagination,page:1})
      setSearch(query);
    }
  }

  return (
    <div>
      <h1 className="scroll-m-20 m-4 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Penjualan
      </h1>
      <div className="w-full flex flex-col gap-4">
        {/* ({flatData.length} of {totalDBRowCount} rows fetched) */}
        <div className="flex gap-6 items-center justify-between">
          <SearchBar onSearch={handleSearch} />
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
        <StatsSale data={stats}/>
        <div
          className="w-full"
          style={{
            height: "600px", //should be a fixed height
          }}
        >
          {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
          <Table>
            <TableHeader className="bg-slate-100 text-black">
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status Pembayaran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell>{sale.code}</TableCell>
                  <TableCell>{formatPrice(sale.total)}</TableCell>
                  <TableCell>
                    {(() => {
                      switch (sale.paymentStatus) {
                        case PaymentStatus.PAID:
                          return <Badge variant={"default"} >Lunas</Badge>;
                        case PaymentStatus.PARTIALPAID:
                          return <Badge variant={"secondary"} >Sebagian Lunas</Badge>;
                        case PaymentStatus.UNPAID:
                          return <Badge variant={"destructive"} >Belum Dibayar</Badge>;
                      }
                    })()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
