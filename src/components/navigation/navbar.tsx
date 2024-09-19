import React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'

const menus = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "About",
        href: "#about"
    },
    {
        title: "Contact",
        href: "#contact"
    },
]

export default function Navbar() {
    return (
        <nav className='flex relative justify-center'>
        <div className='flex absolute mx-auto w-3/4 p-2 mt-3 items-center justify-between bg-slate-900 rounded-xl'>
            <h1 className='text-white'>LOGO</h1>
            <ul className='flex py-2 px-5 rounded-lg gap-10 text-white bg-slate-700'>
                {menus.map((menu) => (
                    <li key={menu.title}>
                        <Link href={menu.href}>{menu.title}</Link>
                    </li>
                ))

                }
            </ul>
            <Link 
                href="/login"
                className={buttonVariants({ variant: "secondary" })}
            >
                Login
            </Link>

        </div>
        </nav>
    )
}
