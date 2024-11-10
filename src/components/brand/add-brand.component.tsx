"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import axiosInstance from "@/utils/axios-util";
import API_ENDPOINT from "../../../config/endpoint";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon, Tag } from "lucide-react";

export default function AddBrand({ reFetch }: { reFetch: () => void }) {
    const [openAddBrand, setOpenAddBrand] = React.useState(false);
    const toast = useToast()
    const [value, setValue] = React.useState({
        name: "",
        code: "",
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axiosInstance.post(API_ENDPOINT.CREATE_BRAND, value)
            .then((res) => {
                reFetch();
                toast.toast({
                    title: "Success",
                    description: "Berhasil Tambahkan Merek",
                    variant: "default",
                })
                setOpenAddBrand(false);
                setValue({
                    name: "",
                    code: "",
                })
            })
            .catch((error) => {
                if (error.code === 400) {
                    toast.toast({
                        title: "Error",
                        description: error.response.data.message[0],
                        variant: "destructive",
                    })
                } else {
                    toast.toast({
                        title: "Error",
                        description: error.response.data.message,
                        variant: "destructive",
                    })
                }
            })
    };

    return (
        <Dialog open={openAddBrand} onOpenChange={setOpenAddBrand}>
            <DialogTrigger asChild>
                <Button className="flex gap-3 shadow hover:shadow-md" variant="outline"><Tag className="w-4" />Tambah Merek <PlusIcon className="w-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Merek</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label>Nama Merek</Label>
                    <Input
                        type="text"
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                    />
                    <Label>Kode Merek</Label>
                    <Input
                        type="text"
                        value={value.code}
                        onChange={(e) => setValue({ ...value, code: e.target.value })}
                    />
                    <Button type="submit">
                        Tambah Merek
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
