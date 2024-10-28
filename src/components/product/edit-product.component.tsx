import { Product } from "@/types/product";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { CheckIcon, Edit, LucideEdit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Brand } from "@/types/brand";
import { Uom } from "@/types/uom";
import { toTitleCase } from "@/utils/util";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Category } from "@/types/category";

export default function EditProduct({ product, fetchProductData, take }: { take: number, product: Product, fetchProductData: (start: number, limit: number) => void }) {
    const [openEditProduct, setOpenEditProduct] = React.useState(false);
    const [open, setOpen] = React.useState({ categories: false, brands: false, uoms: false })
    const [value, setValue] = React.useState({
        category_id: product.category?.id,
        brand_id: product.brand?.id,
        uom_id: product.uom?.id,
        code: product.code,
        name: product.name,
        sell_price: product.sellPrice ?? 0,
        buy_price: product.buyPrice ?? 0,
    })
    const [constantData, setConstantData] = React.useState({
        categories: [] as Category[],
        brands: [] as Brand[],
        uoms: [] as Uom[],
    })
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
    const toast = useToast();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axiosInstance.patch(`${API_ENDPOINT.UPDATE_PRODUCT}/${product.id}`, value)
            .then((res) => {
                toast.toast({
                    title: "Success",
                    description: "Successfully updated product",
                    variant: "default",
                });
                fetchProductData(1, take);
                setOpenEditProduct(false);
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
                                <p>Edit {product?.name?.split(" ")[0] ??"Produk"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Produk</DialogTitle>
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
                        Edit Produk <LucideEdit3></LucideEdit3>
                    </Button>
                </form>
            </DialogContent>
        </Dialog>)
}