import React, { Dispatch, SetStateAction } from "react";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { CartItem } from "./purchase-items.table";
import { Label } from "../ui/label";
import { Check, ChevronsUpDown, Loader, Save } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { mapResponseToClass } from "@/utils/util";
import { Supplier } from "@/types/supplier";


export default function PaymentDetail({
  carts,
  setPurchaseCode,
  setTab,
  setCart,
}: {
  carts?: CartItem[] | undefined;
  setPurchaseCode: Dispatch<SetStateAction<string>>;
  setTab: Dispatch<SetStateAction<"purchase" | "payment">>;
  setCart: Dispatch<SetStateAction<CartItem[] | undefined>>;
}) {
  const [value, setValue] = React.useState<Supplier | undefined>(undefined);
  const [suppliers, setSupplier] = React.useState<Supplier[]>([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [formData, setFormData] = React.useState({
    note: "",
    supplier_id: 0,
    date: new Date(),
  });
  const toast = useToast();

  function handleSubmit() {
    if (value === undefined) {
      toast.toast({
        description: "Supplier is required",
        title: "Error",
        variant: "destructive",
      });
      return;
    }

    setFormData({ ...formData, supplier_id: value?.id ?? 0 });
    if (!carts || carts.length <= 0) {
      toast.toast({
        description: "Cart is empty",
        title: "Error",
        variant: "destructive",
      });
      return;
    }
    const purchaseItems: {
      product_id: number;
      qty: number;
      buy_price: number;
    }[] = [];
    for (let index = 0; index < carts.length; index++) {
      const cart = carts[index];
      if (cart.quantity <= 0) {
        toast.toast({
          description: "Cart item quantity must be greater than 0",
          title: "Error",
          variant: "destructive",
        });
        return;
      }
      purchaseItems.push({
        product_id: cart.product?.id ?? 0,
        qty: cart.quantity,
        buy_price: Number(cart.product?.sellPrice ?? 0),
      });
    }
    setFormData({ ...formData, supplier_id: value?.id ?? 0 });

    axiosInstance
      .post(API_ENDPOINT.CREATE_PURCHASE, {
        supplier_id: value?.id ?? 0,
        date: formData.date,
        note: formData.note,
        purchase_items: purchaseItems,
      })
      .then((res) => {
        if (res.data) {
          toast.toast({
            description: "Purchase created successfully",
            title: "Success",
          });
          setPurchaseCode(res.data.code);
          setCart([]);
          setTab("payment");
        }
      })
      .catch((err) => {
        toast.toast({
          description: err.response.data.message,
          title: "Error",
          variant: "destructive",
        });
      });
  }

  function fetchData() {
    axiosInstance.get(API_ENDPOINT.SUPPLIER_LIST).then((res) => {
      if (Array.isArray(res.data.data)) {
        setSupplier(res.data.data);
      }
    });
  }

  React.useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <div className="w-1/3 h-3/4 gap-4 flex flex-col justify-between border border-slate-300 rounded-xl p-3 shadow-xl">
      <div>
        <Label>Kode</Label>
        <Input disabled value={"AUTO GENERATED"} type="text" />
        <Label>Supplier</Label>
        <Popover open={open2} onOpenChange={setOpen2}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? suppliers.find((supplier) => supplier === value)?.name
                : "Select supplier..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search supplier..." />
              <CommandList>
                <CommandEmpty>No supplier found.</CommandEmpty>
                <CommandGroup>
                  {suppliers.map((supplier, i) => (
                    <CommandItem
                      key={i}
                      value={String(supplier.id ?? 0)}
                      onSelect={(currentValue) => {
                        setValue(
                          suppliers.find((s) => s.id === Number(currentValue))
                        );
                        setOpen2(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === supplier ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {supplier.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Label>Note</Label>
        <Textarea
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />
      </div>
      <Button onClick={handleSubmit} className="flex gap-2">
        Save <Save />
      </Button>
    </div>
  );
}
