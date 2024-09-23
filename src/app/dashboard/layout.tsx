"use client"
import Sidebar from '@/components/navigation/sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import UserButton from '@/components/user-btn'
import { Database, File, Inbox, ScanBarcode, Send } from 'lucide-react'
import React from 'react'

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
        title: "Report",
        href: "/dashboard/report",
        icon: File,
    },
    {
        title: "Master",
        href: "/dashboard/master",
        icon: Database,
        submenu : [
            {
                title: "Barang",
                href: "/dashboard/master/barang",
                icon: Database
            },
            {
                title: "User",
                href: "/dashboard/master/user",
                icon: Database
            },
        ]
    },
    {
        title: "Info",
        href: "/dashboard/info",
        icon: Send,
    },
]

export default function DashboardLayout({ children } : { children: React.ReactNode }) {
  return (
    <div className='h-screen overflow-hidden'>
        <div className='flex w-full h-14'>
            <div className='p-2 w-1/5'>
            <UserButton />
            </div>
            <Separator orientation='vertical'/>
        </div>
        <Separator />
        <div className='flex w-full h-full'>
            <div className='w-1/5 pt-2'>
             <Sidebar links={sidebarMenu}/>
            </div>

            <Separator orientation="vertical" />

            <div className='flex-1 overflow-y-visible'>
                {children}
            </div>
        </div>
    </div>
  )
}
