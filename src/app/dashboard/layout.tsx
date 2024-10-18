"use client";
import { AuthProvider, useAuth } from "@/components/auth/auth.provider";
import Sidebar from "@/components/navigation/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import UserButton from "@/components/user-btn";
import { Database, File, Inbox, ScanBarcode, Send } from "lucide-react";
import { useRouter } from "next/navigation";
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
    title: "Purchase",
    href: "/dashboard/purchase",
    icon: File,
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
        title: "User",
        href: "/dashboard/master/user",
        icon: Database,
      },
    ],
  },
  {
    title: "Info",
    href: "/dashboard/info",
    icon: Send,
  },
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
