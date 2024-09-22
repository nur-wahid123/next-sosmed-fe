import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'
import { usePathname } from 'next/navigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

interface NavProps {
    links: {
        title: string
        icon: LucideIcon
        href: string
        submenu?: {
            title:string,
            icon: LucideIcon,
            href: string
        }[]
    }[]
}

export default function Sidebar({ links }: NavProps) {
    const pathname = usePathname()
    return (
    <aside>
        <nav className='grid gap-1 px-2'>
            {links.map((link, index) => (
                link.submenu ? (
                <Accordion type='single' collapsible key={link.href} className='w-full'>
                    <AccordionItem value={link.title} className="border-b-0">
                        <AccordionTrigger
                            className={cn(
                                buttonVariants({ variant: "ghost"}),
                                "justify-between"
                            )}
                        >
                            <div className='flex'>
                            <link.icon className="-ml-1 mr-2 h-4 w-4" />
                            <span>{link.title}</span>

                            </div>
                        </AccordionTrigger>
                        {link.submenu.map((menu) => (
                            <AccordionContent key={menu.title} className="pb-0">
                                <Link
                                    key={menu.href}
                                    href={menu.href}
                                    className={cn(
                                        buttonVariants({variant: "ghost", size:"sm"}),
                                        pathname === link.href ? "bg-muted " : "hover:bg-muted",
                                        "justify-start",
                                        "ml-4",
                                        "w-full"
                                    )}
                                >
                                    <menu.icon className="mr-2 h-4 w-4" />
                                    <span>{menu.title}</span>
                                </Link>
                            </AccordionContent>
                        ))}
                    </AccordionItem>
                </Accordion>
                ):(
                <Link
                    key={index}
                    href={link.href}
                    className={cn(
                        buttonVariants({variant: "ghost", size:"sm"}),
                        pathname === link.href ? "bg-muted " : "hover:bg-muted",
                        "justify-start"
                    )}
                >
                    <link.icon className="mr-2 h-4 w-4" />
                    <span>{link.title}</span>
                </Link>
                )
            ))}
        </nav>
    </aside>
  )
}
