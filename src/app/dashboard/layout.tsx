"use client";
import Sidebar from "@/components/navigation/sidebar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import {Package, Tag, Layers, Factory, Archive, Receipt, Repeat, LayoutDashboard, Tablet, Sliders } from "lucide-react";
import React from "react";


const sidebarMenu = [
  {
    title: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "POS",
    href: "/dashboard/pos",
    icon: Tablet,
  },
  {
    title: "Master",
    href: "/dashboard/master",
    icon: Sliders,
    submenu: [
      {
        title: "Barang",
        href: "/dashboard/master/barang",
        icon: Package,
      },
      {
        title: "Supplier",
        href: "/dashboard/master/supplier",
        icon: Factory,
      },
      {
        title: "Kategori",
        href: "/dashboard/master/category",
        icon: Layers,
      },
      {
        title: "Merek",
        href: "/dashboard/master/brand",
        icon: Tag,
      },
    ],
  },
  {
    title: "Transaksi",
    href: "/dashboard/transaction",
    icon: Repeat,
    submenu: [
      {
        title: "Stock",
        href: "/dashboard/transaction/inventory",
        icon: Archive,
      },
      {
        title: "Penjualan",
        href: "/dashboard/transaction/sale",
        icon: Receipt,
      },
    ],
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex w-full h-full">
        <div className="w-[20vw] lg:w-[15vw] pt-2">
          <Sidebar links={sidebarMenu} />
        </div>

        <Separator orientation="vertical" />

        <div className="w-full min-h-screen overflow-y-auto p-2">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
