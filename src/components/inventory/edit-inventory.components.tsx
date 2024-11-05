import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { Product } from "@/types/product";
import { Input } from "../ui/input";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";
import { useToast } from "@/hooks/use-toast";
import React from "react";

export default function EditInventory({ product, reFetch }: { product: Product, reFetch: () => void }) {
    const toast = useToast()
    const [open, setOpen] = React.useState(false)
    const [qty, setqty] = React.useState(0)
    React.useEffect(()=>{
        setqty(product.inventory?.qty ?? 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleUpdateInventory = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('oii');
        
        e.preventDefault()
        await axiosInstance.patch(`${API_ENDPOINT.UPDATE_INVENTORY}/${product.id}`, {
            qty: Number(qty)
        })
            .then(async (res) => {
                reFetch();
                setOpen(false)
                toast.toast({ title: "Success", description: "Successfully updated inventory", variant: "default" })
            })
            .catch((err) => {
                toast.toast({ title: "Error", description: err.response.data.message, variant: "destructive" })
            })
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Edit Stok <PlusIcon /></Button>
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Edit Stok Produk</DialogTitle>
                        <DialogDescription asChild>
                            <div className="flex flex-col gap-3 text-lg text-black">
                                <p>Nama Produk : <span className="font-semibold">{product.name}</span></p>
                                <p>Stok Saat ini : <span className="font-semibold">{product.inventory?.qty ?? 0}</span></p>
                                <p>Edit Stok Menjadi :</p>
                                <form className="flex gap-3 flex-col" onSubmit={handleUpdateInventory}>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={qty}
                                        onChange={(e) => setqty(Number(e.target.value))}
                                        className="font-bold text-2xl w-fit"
                                        inputMode="numeric"
                                    />
                                    <Button type="submit">Simpan</Button>
                                </form>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}