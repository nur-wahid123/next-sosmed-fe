"use client"

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { formatPrice } from "@/utils/currency.util";

export function CardsStats({data}:{data:{all_product: number
    , total_item: number
    , value_of_products: number}}) {

    return (
        <div className="flex flex-wrap gap-3 p-3">
            <Card className="px-20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">Total Produk</CardTitle>
                </CardHeader>
                <CardContent className="pb-0">
                    <div className="text-2xl font-bold">{data.all_product||0} <span className="text-xs text-muted-foreground">
                        Produk
                    </span></div>
                    
                </CardContent>
            </Card>
            <Card className="px-16">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">Total Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.total_item||0} <span className="text-xs text-muted-foreground">
                        Item
                    </span></div>
                    
                </CardContent>
            </Card>
            <Card className="px-12">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">Valuasi Produk</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(data.value_of_products)}</div>
                    <p className="text-xs text-muted-foreground">
                        
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}