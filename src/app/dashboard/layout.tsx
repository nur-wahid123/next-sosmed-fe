"use client";
import Sidebar from "@/components/navigation/sidebar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { Database, File, Inbox, ScanBarcode,Monitor, Send, Landmark, WalletMinimal, LogOut } from "lucide-react";
import React from "react";


const sidebarMenu = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Inbox,
  },
  {
    title: "POS",
    href: "/dashboard/pos",
    icon: ScanBarcode,
  },
  {
    title: "Master",
    href: "/dashboard/master",
    icon: Database,
    submenu: [
      {
        title: "Barang",
        href: "/dashboard/master/barang",
        icon: Database,
      },
      {
        title: "Supplier",
        href: "/dashboard/master/supplier",
        icon: Database,
      },
    ],
  },
  {
    title: "Transaction",
    href: "/dashboard/transaction",
    icon: Monitor,
    submenu: [
      {
        title: "Inventory",
        href: "/dashboard/transaction/inventory",
        icon: Landmark,
      },
      {
        title: "Penjualan",
        href: "/dashboard/transaction/sale",
        icon: WalletMinimal,
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
