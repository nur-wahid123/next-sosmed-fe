import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { ChevronsUpDown } from 'lucide-react'

export default function UserButton() {
    
  return (
    <Popover>
        <PopoverTrigger className="w-full">
            <Button
                variant="outline"
                role="combobox"
                aria-label="User"
                className={cn("w-full justify-between")}
            >
                <p>Admin</p>
                <ChevronsUpDown className='h-4 w-4'/>
            </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-full'>
            <p>logout</p>
        </PopoverContent>
    </Popover>
  )
}
