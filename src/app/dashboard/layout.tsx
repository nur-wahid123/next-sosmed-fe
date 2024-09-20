import Sidebar from '@/components/navigation/sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { File, Inbox, Send } from 'lucide-react'
import React from 'react'

const sidebarMenu = [
    {
        title: "Home",
        href: "/dashboard",
        icon: Inbox,
    },
    {
        title: "File",
        href: "/dashboard",
        icon: File,
    },
    {
        title: "Sent",
        href: "/dashboard",
        icon: Send,
    },
]

export default function DashboardLayout({ children } : { children: React.ReactNode }) {
  return (
    <div className='h-screen overflow-hidden'>
        <div className='flex w-full h-14'>
            <div className='p-2 w-1/5'>
            <Button variant="outline" className='w-full'>
                hello, Admin
            </Button>
            </div>
            <Separator orientation='vertical'/>
        </div>
        <Separator />
        <div className='flex w-full h-full'>
            <div className='w-1/5 pt-2'>
             <Sidebar links={sidebarMenu}/>
            </div>

            <Separator orientation="vertical" />

            <div className='overflow-y-visible'>
                {children}
            </div>
        </div>
    </div>
  )
}
