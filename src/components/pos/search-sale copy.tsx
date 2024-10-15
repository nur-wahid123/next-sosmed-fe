import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";

class Sale {
  code!: string;
  paymentStatus!: string;
  date!: Date;
}

export default function PurchaseSearch({
  setOpen,
  setPurchaseCode,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPurchaseCode: Dispatch<SetStateAction<any>>;
}) {
  const [purchaseData, setPurchaseData] = useState<Sale[]>([]);
  function fetchData(search?: string) {
    const url =
      search && search.length > 0
        ? `${API_ENDPOINT.GET_PURCHASE}?search=${search}`
        : `${API_ENDPOINT.GET_PURCHASE}`;
    axiosInstance.get(url).then((res) => {
      if (Array.isArray(res.data.data)) {
        setPurchaseData(res.data.data);
      }
    });
  }

  function handleClick(code: any) {
    setPurchaseCode(code);
    setOpen(false);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    fetchData(e.target.value);
  }

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);
  return (
    <div className="p-4">
      <Input onChange={handleSearch} type="text" placeholder="Search" />
      <Table className="w-full">
        <TableCaption>A list of Sale</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseData.map((sale, i) => (
            <TableRow
              onClick={() => {
                handleClick(sale);
              }}
              className="hover:brightness-90 hover:cursor-pointer"
              key={i}
            >
              <TableCell>{sale.code}</TableCell>
              <TableCell>{new Date(sale.date).toDateString()}</TableCell>
              <TableCell>{sale.paymentStatus.toUpperCase()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
