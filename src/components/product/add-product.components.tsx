"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { CheckIcon, Package2Icon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons"
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";
import { Label } from "../ui/label";
import { Category } from "@/app/dashboard/master/barang/page";
import { Button } from "../ui/button";
import { toTitleCase } from "@/utils/util";
import { Input } from "../ui/input";
import { Brand } from "@/types/brand";
import { Uom } from "@/types/uom";
import { useToast } from "@/hooks/use-toast";

export default function AddProduct() {
    const [openAddProduct, setOpenAddProduct] = React.useState(false);
    const [open, setOpen] = React.useState({ categories: false, brands: false, uoms: false })
    const toast = useToast()
    const [value, setValue] = React.useState({
        category_id: 0,
        brand_id: 0,
        uom_id: 0,
        buy_price: 0,
        sell_price: 0,
        name: "",
        code: "",
    })
    const [constantData, setConstantData] = React.useState<{
        categories: Category[];
        brands: Brand[];
        uoms: Uom[]
    }>({ categories: [], brands: [], uoms: [] });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: 'sell_price' | 'buy_price') => {
        // Remove non-numeric characters before updating the state
        if (e.target.value === '0') {
            e.target.value = '';
        }
        const numericValue = e.target.value.replace(/\D/g, "");
        setValue({ ...value, [name]: Number(numericValue) });
    };

    const fetchData = React.useCallback(async () => {
        try {
            // Fetch categories
            const categoryResponse = await axiosInstance.get(API_ENDPOINT.CATEGORY_LIST);
            setConstantData((prevData) => ({
                ...prevData,
                categories: categoryResponse.data,
            }));

            // Fetch brands
            const brandResponse = await axiosInstance.get(API_ENDPOINT.BRAND_LIST);
            setConstantData((prevData) => ({
                ...prevData,
                brands: brandResponse.data.data,
            }));

            // Fetch uoms
            const uomResponse = await axiosInstance.get(API_ENDPOINT.UOM_LIST);
            setConstantData((prevData) => ({
                ...prevData,
                uoms: uomResponse.data.data,
            }));

        } catch (error) {
            console.log(error);
        }
    }, []);

    React.useEffect(() => {
        fetchData();
        return () => {

        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axiosInstance.post(API_ENDPOINT.ADD_PRODUCT, value)
            .then((res) => {
                fetchData();
                toast.toast({
                    title: "Success",
                    description: "Successfully added product",
                    variant: "default",
                })
                setOpenAddProduct(false);
                setValue({
                    category_id: 0,
                    brand_id: 0,
                    uom_id: 0,
                    buy_price: 0,
                    sell_price: 0,
                    name: "",
                    code: "",
                })
            })
            .catch((error) => {
                toast.toast({
                    title: "Error",
                    description: error.response.data.message[0],
                    variant: "destructive",
                })
            })
    };

    return (
        <Dialog open={openAddProduct} onOpenChange={setOpenAddProduct}>
            <DialogTrigger asChild>
                <Button className="flex gap-3 shadow hover:shadow-md" variant="outline"><Package2Icon className="w-4" />Tambah Produk <PlusIcon className="w-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Produk</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Kategori</Label>
                            <Popover open={open.categories} onOpenChange={() => setOpen({ ...open, categories: !open.categories })}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-[200px] justify-between"
                                    >
                                        {value.category_id !== 0
                                            ? toTitleCase(String(constantData.categories.find((categorie) => categorie.id === value.category_id)?.name))
                                            : "Pilih Kategori..."}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search categorie..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No category found.</CommandEmpty>
                                            <CommandGroup>
                                                {constantData.categories.map((categorie) => (
                                                    <CommandItem
                                                        key={categorie.id}
                                                        value={JSON.stringify(categorie)}
                                                        onSelect={(currentValue) => {
                                                            const currentValueJson = JSON.parse(currentValue) as Category;
                                                            setValue(({ ...value, category_id: (currentValueJson.id ?? 1) }));
                                                            setOpen(({ ...open, categories: false }))
                                                        }}

                                                    >
                                                        {toTitleCase(String(categorie.name))}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                value.category_id === categorie.id ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Merek</Label>
                            <Popover open={open.brands} onOpenChange={() => setOpen({ ...open, brands: !open.brands })}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-[200px] justify-between"
                                    >
                                        {value.brand_id !== 0
                                            ? toTitleCase(String(constantData.brands.find((brand) => brand.id === value.brand_id)?.name))
                                            : "Pilih Merek..."}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search brand..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No category found.</CommandEmpty>
                                            <CommandGroup>
                                                {constantData.brands.map((brand) => (
                                                    <CommandItem
                                                        key={brand.id}
                                                        value={JSON.stringify(brand)}
                                                        onSelect={(currentValue) => {
                                                            const currentValueJson = JSON.parse(currentValue) as Brand;
                                                            setValue(({ ...value, brand_id: currentValueJson.id ?? 0 }));
                                                            setOpen(({ ...open, brands: false }))
                                                        }}

                                                    >
                                                        {toTitleCase(String(brand.name))}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                value.brand_id === brand.id ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Unit</Label>
                            <Popover open={open.uoms} onOpenChange={() => setOpen({ ...open, uoms: !open.uoms })}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-[200px] justify-between"
                                    >
                                        {value.uom_id !== 0
                                            ? toTitleCase(String(constantData.uoms.find((uom) => uom.id === value.uom_id)?.description))
                                            : "Pilih Unit..."}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search uom..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No category found.</CommandEmpty>
                                            <CommandGroup>
                                                {constantData.uoms.map((uom) => (
                                                    <CommandItem
                                                        key={uom.id}
                                                        value={JSON.stringify(uom)}
                                                        onSelect={(currentValue) => {
                                                            const currentValueJson = JSON.parse(currentValue)
                                                            setValue(({ ...value, uom_id: currentValueJson.id ?? 0 }));
                                                            setOpen(({ ...open, uoms: false }))
                                                        }}
                                                    >
                                                        {toTitleCase(String(uom.name))}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                value.uom_id === uom.id ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <label htmlFor="price">Harga Beli:</label>
                    <div className="relative max-w-64 flex items-center">
                        <span className="absolute left-3 font-bold  pointer-events-none">
                            Rp.
                        </span>
                        <Input
                            type="text"
                            inputMode="numeric"
                            className="pl-10 h-fit text-right"
                            placeholder="0"
                            value={value.buy_price.toLocaleString()}
                            onChange={(e) => handleInputChange(e, 'buy_price')}
                        />
                    </div>
                    <label htmlFor="price">Harga Jual:</label>
                    <div className="relative max-w-64 flex items-center">
                        <span className="absolute left-3 font-bold  pointer-events-none">
                            Rp.
                        </span>
                        <Input
                            type="text"
                            inputMode="numeric"
                            className="pl-10 h-fit text-right"
                            placeholder="0"
                            value={value.sell_price.toLocaleString()}
                            onChange={(e) => handleInputChange(e, 'sell_price')}
                        />
                    </div>
                    <Label>Nama Produk</Label>
                    <Input
                        type="text"
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                    />
                    <Label>Kode Produk</Label>
                    <Input
                        type="text"
                        value={value.code}
                        onChange={(e) => setValue({ ...value, code: e.target.value })}
                    />
                    <Button type="submit">
                        Tambah Produk
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
