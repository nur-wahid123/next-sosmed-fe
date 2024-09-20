import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'

interface NavProps {
    links: {
        title: string
        icon: LucideIcon
        href: string
    }[]
}

export default function Sidebar({ links }: NavProps) {
  return (
    <aside>
        <nav className='grid gap-1 px-2'>
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    className={cn(
                        buttonVariants({variant: "ghost", size:"sm"}),
                        "justify-start"
                    )}
                >
                    <link.icon className="mr-2 h-4 w-4" />
                    <span>{link.title}</span>
                </Link>
            ))}
        </nav>
    </aside>
  )
}
