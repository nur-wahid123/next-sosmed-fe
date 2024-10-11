import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import SaleSearch from "./search-sale";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Separator } from "../ui/separator";
import { formatPrice } from "@/utils/currency.util";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";

export default function PaymentPurchase({ sale_code }: { sale_code?: string }) {
  const [sale, setSale] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const [needToPay, setNeedToPay] = React.useState<{
    needToPay: number;
    lateFees: number;
  }>();
  const [pay, setPay] = React.useState(0);
  const toast = useToast();

  React.useEffect(() => {
    if (sale_code) {
      const url = `${API_ENDPOINT.GET_SALE}?sale_code=${sale_code}`;
      axiosInstance.get(url).then((res) => {
        if (Array.isArray(res.data)) {
          setSale(res.data[0]);
        }
      });
    }
    return () => {};
  }, []);

  React.useEffect(() => {
    if (sale) {
      axiosInstance
        .get(`${API_ENDPOINT.CHECK_SALE_NEED_TO_PAY}?sale_code=${sale.code}`)
        .then((res) => {
          console.log(res);
          setNeedToPay({
            needToPay: res.data.needToPay,
            lateFees: res.data.lateFees,
          });
        })
        .catch((err) => {
          setNeedToPay({
            needToPay: 0,
            lateFees: 0,
          });
          toast.toast({
            title: "Error",
            description: err.response.data.message,
            variant: "destructive",
          });
        });
    }
  }, [sale]);

  function handlePay() {
    if (sale) {
      axiosInstance
        .post(`${API_ENDPOINT.PAY_SALE}`, {
          sale_code: sale.code,
          paid: pay,
          note: "Payment",
        })
        .then((res) => {
          setPay(0);
          const url = `${API_ENDPOINT.GET_SALE}?sale_code=${sale.code}`;
          axiosInstance.get(url).then((res) => {
            if (Array.isArray(res.data)) {
              setSale(res.data[0]);
            }
          });
        })
        .catch((err) => {
          toast.toast({
            title: "Error",
            description: err.response.data.message,
            variant: "destructive",
          });
        });
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters before updating the state
    const numericValue = e.target.value.replace(/\D/g, "");
    setPay(Number(numericValue));
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex h-full w-full gap-5">
        <div className="w-2/3 flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
              Sale Item
            </h1>
            <div className="h-full">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                  <Button>{sale ? sale.code : "Search Sale Code"}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] w-full">
                  <DialogHeader>
                    <DialogTitle>Search Sale</DialogTitle>
                    <DialogDescription>
                      <SaleSearch setOpen={setOpen} setSaleCode={setSale} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Table className="h-full overflow-y-auto">
                <TableCaption>A list of your product</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Item</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sale &&
                    Array.isArray(sale.saleItems) &&
                    sale.saleItems.length > 0 &&
                    sale.saleItems.map((data: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {data.product.name}
                        </TableCell>
                        <TableCell>{formatPrice(data.price)}</TableCell>
                        <TableCell>{data.qty}</TableCell>
                        <TableCell className="text-right">
                          {formatPrice(data.subTotal)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
              Payment
            </h1>
            <div className="h-full">
              <Table className="h-full overflow-y-auto">
                <TableCaption>A list of your payment</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sale &&
                    Array.isArray(sale.payments) &&
                    sale.payments.length > 0 &&
                    sale.payments.map((data: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {data.code}
                        </TableCell>
                        <TableCell>{data.date}</TableCell>
                        <TableCell>{data.note}</TableCell>
                        <TableCell className="text-right">
                          {formatPrice(data.paid)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="w-1/3 h-full gap-10 flex flex-col justify-between rounded-lg p-3 border-[2px] shadow-lg border-black">
          <div>
            <div className="flex justify-between">
              <div className="font-bold text-xl">Subtotal</div>
              <div className=" text-xl">{sale && formatPrice(sale?.total)}</div>
            </div>
            <div className="flex my-3 justify-between">
              <div className="font-bold text-xl">Discount</div>
              <div className=" text-xl">{formatPrice(0)}</div>
            </div>
            <Separator className="my-5" />
            <div className="flex justify-between">
              <div className="font-bold text-xl">TOTAL</div>
              <div className=" text-xl">{sale && formatPrice(sale?.total)}</div>
            </div>
            <Separator className="my-5" />
            <div className="flex justify-between">
              <div className="font-bold text-xl">Paid</div>
              <div className=" text-xl">
                {sale &&
                  formatPrice(
                    sale?.payments
                      .map((p: any) => p.paid)
                      .reduce((a: any, b: any) => a + b, 0)
                  )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="font-bold text-xl">Late Fee</div>
                <div className=" text-xl">
                  {sale && formatPrice(Number(needToPay?.lateFees))}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold text-xl">Due</div>
                <div className=" text-xl">
                  {sale && formatPrice(Number(needToPay?.needToPay))}
                </div>
              </div>
            </div>
          </div>
          {sale && sale.paymentStatus !== "paid" && (
            <>
              <div className="relative flex items-center">
                <span className="absolute left-3 font-bold text-3xl pointer-events-none">
                  Rp.
                </span>
                <Input
                  type="text"
                  inputMode="numeric"
                  className="pl-10 h-fit text-2xl font-semibold text-right"
                  placeholder="0"
                  value={pay.toLocaleString()}
                  onChange={handleInputChange}
                />
              </div>
              <Button onClick={handlePay}>Pay Now</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
