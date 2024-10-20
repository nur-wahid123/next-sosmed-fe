"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { CheckIcon, Package2Icon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {CaretSortIcon} from "@radix-ui/react-icons"
import { Supplier } from "../pos/payment-detail";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";
import { Label } from "../ui/label";
import { Category } from "@/app/dashboard/master/barang/page";
import { Button } from "../ui/button";
import { toTitleCase } from "@/utils/util";

export default function AddProduct() {
    const [open, setOpen] = React.useState({categories: false, suppliers: false})
    const [value, setValue] = React.useState({
        categories: 0,
        suppliers: 0,
    })
    const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
    const [categories, setCategories] = React.useState<Category[]>([]);
    function fetchSuppliers() {
        axiosInstance
            .get(API_ENDPOINT.SUPPLIER_LIST)
            .then((response) => {
                setSuppliers(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function fetchCategories() {
        axiosInstance
            .get(API_ENDPOINT.CATEGORY_LIST)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    React.useEffect(() => {
        fetchSuppliers();
        fetchCategories();
        return () => {

        };
    }, []);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex gap-3 shadow hover:shadow-md" variant="outline"><Package2Icon className="w-4"/>Add Product <PlusIcon className="w-4"/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Product </DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-4">
                    <Label>Supplier</Label>
                    <Popover open={open.suppliers} onOpenChange={()=>setOpen({...open, suppliers: !open.suppliers})}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-[200px] justify-between"
                            >
                                {value.suppliers!==0
                                    ? suppliers.find((supplier) => supplier.id === value.suppliers)?.name
                                    : "Select supplier..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search supplier..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No supplier found.</CommandEmpty>
                                    <CommandGroup>
                                        {suppliers.map((supplier) => (
                                            <CommandItem
                                                key={supplier.name}
                                                value={String(supplier.id)}
                                                onSelect={(currentValue) => {
                                                    setValue(({ ...value, suppliers: Number(currentValue??0) }));
                                                    setOpen({...open, suppliers: false})
                                                }}

                                            >
                                                {supplier.name}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        value.suppliers === supplier.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Label>Kategori</Label>
                    <Popover open={open.categories} onOpenChange={()=>setOpen({...open, categories: !open.categories})}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-[200px] justify-between"
                            >
                                {value.categories!==0
                                    ? toTitleCase(String(categories.find((categorie) => categorie.id === value.categories)?.name))
                                    : "Select categorie..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search categorie..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No categorie found.</CommandEmpty>
                                    <CommandGroup>
                                        {categories.map((categorie) => (
                                            <CommandItem
                                                key={categorie.name}
                                                value={String(categorie.id)}
                                                onSelect={(currentValue) => {
                                                    setValue(({ ...value, categories: Number(currentValue??0) }));
                                                    setOpen(({...open, categories: false}))
                                                }}

                                            >
                                                {toTitleCase(String(categorie.name))}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        value.categories === categorie.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <div className="shadcn">
                        <label htmlFor="price">Price:</label>
                        <input type="text" id="price" />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
