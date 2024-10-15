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
import PurchaseSearch from "./search-sale copy";

export default function PaymentPurchase({
  purchase_code,
}: {
  purchase_code?: string;
}) {
  const [purchase, setPurchase] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const [needToPay, setNeedToPay] = React.useState<{
    needToPay: number;
    lateFees: number;
  }>();
  const [pay, setPay] = React.useState(0);
  const toast = useToast();

  React.useEffect(() => {
    if (purchase_code) {
      const url = `${API_ENDPOINT.GET_PURCHASE}?code=${purchase_code}`;
      axiosInstance.get(url).then((res) => {
        if (Array.isArray(res.data.data)) {
          setPurchase(res.data.data[0]);
        }
      });
    }
    return () => {};
  }, []);

  React.useEffect(() => {
    if (purchase) {
      axiosInstance
        .get(
          `${API_ENDPOINT.CHECK_PURCHASE_NEED_TO_PAY}?purchase_code=${purchase.code}`
        )
        .then((res) => {
          setNeedToPay({
            needToPay: res.data,
            lateFees: 0,
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
  }, [purchase]);

  function handleFullPay() {
    setPay(needToPay?.needToPay ?? 0);
    handlePay();
  }
  function handlePay() {
    if (purchase) {
      axiosInstance
        .post(`${API_ENDPOINT.PAY_PURCHASE}`, {
          purchase_code: purchase.code,
          paid: pay,
          note: "Payment",
        })
        .then((res) => {
          setPay(0);
          const url = `${API_ENDPOINT.GET_PURCHASE}?code=${purchase.code}`;
          axiosInstance.get(url).then((res) => {
            if (Array.isArray(res.data.data)) {
              setPurchase(res.data.data[0]);
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
              Purchase Item
            </h1>
            <div className="h-full">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                  <Button>
                    {purchase ? purchase.code : "Search Purchase Code"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] w-full">
                  <DialogHeader>
                    <DialogTitle>Search Sale</DialogTitle>
                    <DialogDescription>
                      <PurchaseSearch
                        setOpen={setOpen}
                        setPurchaseCode={setPurchase}
                      />
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
                  {purchase &&
                    Array.isArray(purchase.purchaseItems) &&
                    purchase.purchaseItems.length > 0 &&
                    purchase.purchaseItems.map((data: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {data.product.name}
                        </TableCell>
                        <TableCell>{formatPrice(data.buyPrice)}</TableCell>
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
                  {purchase &&
                    Array.isArray(purchase.payments) &&
                    purchase.payments.length > 0 &&
                    purchase.payments.map((data: any, i: number) => (
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
              <div className=" text-xl">
                {purchase && formatPrice(purchase?.total)}
              </div>
            </div>
            <div className="flex my-3 justify-between">
              <div className="font-bold text-xl">Discount</div>
              <div className=" text-xl">{formatPrice(0)}</div>
            </div>
            <Separator className="my-5" />
            <div className="flex justify-between">
              <div className="font-bold text-xl">TOTAL</div>
              <div className=" text-xl">
                {purchase && formatPrice(purchase?.total)}
              </div>
            </div>
            <Separator className="my-5" />
            <div className="flex justify-between">
              <div className="font-bold text-xl">Paid</div>
              <div className=" text-xl">
                {purchase &&
                  formatPrice(
                    purchase?.payments
                      .map((p: any) => p.paid)
                      .reduce((a: any, b: any) => a + b, 0)
                  )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="font-bold text-xl">Late Fee</div>
                <div className=" text-xl">
                  {purchase && formatPrice(Number(needToPay?.lateFees))}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold text-xl">Due</div>
                <div className=" text-xl">
                  {purchase && formatPrice(Number(needToPay?.needToPay))}
                </div>
              </div>
            </div>
          </div>
          {purchase && purchase.paymentStatus !== "paid" && (
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
              <Button onClick={handleFullPay}>Full Paid</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
