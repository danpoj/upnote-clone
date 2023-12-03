'use client'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function Notebooks() {
  const [isOpen, setIsOpen] = useState(true)
  const [name, setName, isLoadingName] = useLocalStorage<string>('name')
  const [age, setAge, isLoadingAge] = useLocalStorage<number>('age')

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className='flex items-center'>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='icon' className='w-7 hover:bg-white'>
            <ChevronDown
              className={cn(
                'h-5 w-5 stroke-[1.5px] transition text-primary/50',
                isOpen ? 'rotate-0' : '-rotate-[90deg]'
              )}
            />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <span className='flex items-center gap-2 text-blue-700 uppercase text-sm'>notebooks</span>
      </div>
      <CollapsibleContent className='flex flex-col'></CollapsibleContent>
    </Collapsible>
  )
}
