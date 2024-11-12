import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { Sale } from "@/types/sale";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";
import { Eye } from "lucide-react";
import { formatPrice } from "@/utils/currency.util";

export function SaleDetailDialog({ saleId }:{saleId:number}) {
    const [sale, setSale] = React.useState<Sale>();
    const [open, setOpen] = React.useState(false);

    const fetchSale = React.useCallback(async () => {
        try {
            const response = await axiosInstance.get(`${API_ENDPOINT.GET_SALE_DETAIL}/${saleId}`);
            setSale(response.data);
        } catch (error) {
            console.error("Error fetching sale:", error);
        }
    }, [saleId]);

    React.useEffect(() => {
        if (open) {
            fetchSale()
        }
        return () => {
            
        };
    }, [open, fetchSale]);
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Details <Eye/></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sale Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Sale ID:</span>
            <span>{sale?.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{new Date(sale?.date||new Date()).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span>{formatPrice(sale?.total||0)}</span>
          </div>
          <div>
            <h3 className="font-semibold">Items:</h3>
            <ul className="list-disc pl-5">
              {sale?.saleItems?.map((item, index) => (
                <li key={index}>
                  {item.product?.name} - {item.qty} x {formatPrice(item.price||0)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
