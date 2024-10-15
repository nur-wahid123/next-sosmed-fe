import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Package2, Plus, Trash2, TrashIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Product } from "@/app/dashboard/master/barang/page";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";
import { mapResponseToClass } from "@/utils/util";
import { formatPrice } from "@/utils/currency.util";
import { Input } from "../ui/input";

export class CartItem {
  product: Product | undefined;
  quantity: number = 0;
}
export default function PurchaseItemsTable({
  carts,
  setCart,
}: {
  carts: CartItem[] | undefined;
  setCart: Dispatch<SetStateAction<CartItem[] | undefined>>;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  function fetchData(search?: string) {
    const url = search
      ? `${API_ENDPOINT.PRODUCT_LIST}?search=${search}`
      : `${API_ENDPOINT.PRODUCT_LIST}`;
    axiosInstance.get(url).then((res) => {
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
  }

  function addToCart(product: Product) {
    if (carts?.find((cart) => cart.product?.id === product.id)) {
      setOpen(false);
    } else {
      setCart((prev) => {
        if (prev) {
          return [...prev, { product, quantity: 1 }];
        } else {
          return [{ product, quantity: 1 }];
        }
      });
    }
    setOpen(false);
  }

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    fetchData(e.target.value);
  }

  return (
    <div className="w-full">
      <div className="max-h-[70vh] w-full overflow-y-auto">
        <Table className="">
          <TableHeader className="w-full">
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {carts?.map((cart, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Button
                    className="p-3"
                    onClick={() =>
                      setCart((prev) =>
                        prev?.filter((c) => c.product?.id !== cart.product?.id)
                      )
                    }
                  >
                    <Trash2 className="w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="font-thin text-lg">{cart.product?.code}</div>
                  <div className="font-semibold text-xl">
                    {cart.product?.name}
                  </div>
                  <div className="font-thin text-base">
                    {cart.product?.uom?.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="w-16"
                    onChange={(e) =>
                      setCart((prev) =>
                        prev?.map((c) =>
                          c.product?.id === cart.product?.id
                            ? { ...c, quantity: Number(e.target.value) }
                            : c
                        )
                      )
                    }
                    value={cart.quantity}
                  />
                </TableCell>
                <TableCell>
                  {formatPrice(cart.product?.sellPrice as number)}
                </TableCell>
                <TableCell>
                  {formatPrice(
                    Number(cart.product?.sellPrice) * Number(cart.quantity)
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-full py-3 border-y border-slate-300 px-10 flex gap-5 items-center justify-between">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="">
            <Button className="flex  gap-2">
              <Plus /> Add Product <Package2 />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] w-full overflow-hidden">
            <DialogHeader>
              <DialogTitle>What do you want to purchase?</DialogTitle>
              <DialogDescription>
                <div className="w-full ">
                  <Input onChange={handleChange} type="text" />
                  <div className="overflow-y-auto max-h-[60vh]">
                    <Table className="w-full h-96">
                      <TableHeader>
                        <TableRow className="w-full">
                          <TableHead>Product</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="max-h-[60vh] overflow-y-auto">
                        {products.map((product, i) => (
                          <TableRow
                            className="hover:cursor-pointer w-full"
                            onClick={() => addToCart(product)}
                            key={i}
                          >
                            <TableCell>
                              <div className="font-light text-base">
                                {product.code}
                              </div>
                              <div className="font-semibold text-lg">
                                {product.name}
                              </div>
                              <div className="font-light text-slate-500 text-sm">
                                ({product.uom?.name})
                              </div>
                            </TableCell>
                            <TableCell>{product.inventory?.qty ?? 0}</TableCell>
                            <TableCell>
                              {formatPrice(product.sellPrice as number)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="font-bold">TOTAL</div>
        <div>
          {carts &&
            formatPrice(
              carts.reduce(
                (a, b) =>
                  a + Number(b.product?.sellPrice ?? 0) * Number(b.quantity),
                0
              )
            )}
        </div>
      </div>
    </div>
  );
}
