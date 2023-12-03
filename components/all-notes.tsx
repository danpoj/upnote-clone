'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { BookCopy as AllNotes, Calendar, CheckSquare2, ChevronDown, CloudOff, Filter, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Allnotes() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className='flex items-center bg-primary/5 text-[15px]'>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='icon' className='w-7'>
            <ChevronDown
              className={cn(
                'h-5 w-5 stroke-[1.5px] transition text-primary/50',
                isOpen ? 'rotate-0' : '-rotate-[90deg]'
              )}
            />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <span className='flex items-center gap-2 tracking-tight text-primary/70'>
          <AllNotes className='stroke-[1.5px] w-[1.1rem] h-[1.1rem]' />
          All Notes
        </span>
      </div>
      <CollapsibleContent>
        <SidebarButton text='todo'>
          <CheckSquare2 className='w-[1.05rem] h-[1.05rem] stroke-red-600' />
        </SidebarButton>
        <SidebarButton text='shared notes'>
          <Share2 className='w-[1.05rem] h-[1.05rem] stroke-blue-600' />
        </SidebarButton>
        <SidebarButton text='today'>
          <Calendar className='w-[1.05rem] h-[1.05rem] stroke-cyan-600' />
        </SidebarButton>
        <SidebarButton text='uncategorized'>
          <Filter className='w-[1.05rem] h-[1.05rem] stroke-teal-600' />
        </SidebarButton>
        <SidebarButton text='unsynced'>
          <CloudOff className='w-[1.05rem] h-[1.05rem] stroke-fuchsia-600' />
        </SidebarButton>
      </CollapsibleContent>
    </Collapsible>
  )
}

function SidebarButton({ children, text }: { children: React.ReactNode; text?: string }) {
  return (
    <button className='flex items-center gap-2 p-2 pl-10 hover:bg-primary/5 w-full'>
      {children}
      <span className='font-light text-[15px]'>{text}</span>
    </button>
  )
}
