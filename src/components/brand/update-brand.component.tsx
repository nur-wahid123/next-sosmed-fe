import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Edit, LucideEdit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Brand } from "@/types/brand";
import { Input } from "../ui/input";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function EditBrand({ brandId, reFetch }: { brandId: number | undefined, reFetch: () => void }) {
    const [openEditProduct, setOpenEditProduct] = React.useState(false);
    const [brand, setBrand] = React.useState({} as Brand);
    const toast = useToast()
    const [value, setValue] = React.useState({
        code: "",
        name: "",
    })

    React.useEffect(() => {
        if (brand) {
            setValue({
                code: brand.code ?? "",
                name: brand.name ?? "",
            })
        }
    }, [brand]);

    
    const fetchData = React.useCallback(async () => {
        const brandRes = await axiosInstance.get(`${API_ENDPOINT.BRAND_DETAIL}/${brandId}`);
        setBrand(brandRes.data);
    },[brandId])
    
    React.useEffect(() => {
        if(openEditProduct===true){
            fetchData();
        }
    }, [ openEditProduct, fetchData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axiosInstance.patch(`${API_ENDPOINT.UPDATE_BRAND}/${brandId}`, value)
            .then((res) => {
                toast.toast({
                    title: "Success",
                    description: "Berhasil edit merek",
                    variant: "default",
                });
                reFetch();
                setOpenEditProduct(false);
            })
            .catch((err) => {
                if (err.code === 400) {
                    toast.toast({ title: "Error", description: err.response.data.message[0], variant: "destructive" })
                }else{
                    toast.toast({ title: "Error", description: err.response.data.message, variant: "destructive" })
                }
            })
    }
    return (
        <Dialog open={openEditProduct} onOpenChange={setOpenEditProduct}>
            <DialogTrigger asChild>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <button><Edit className="w-4"></Edit></button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit {value?.name?.split(" ")[0] ?? "Produk"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Merek</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label>Kode Merek</Label>
                    <Input
                        type="text"
                        disabled
                        value={value.code}
                        onChange={(e) => setValue({ ...value, code: e.target.value })}
                    />
                    <Label>Nama Merek</Label>
                    <Input
                        type="text"
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                    />
                    <Button type="submit">
                        Edit Merek <LucideEdit3></LucideEdit3>
                    </Button>
                </form>
            </DialogContent>
        </Dialog>)
}