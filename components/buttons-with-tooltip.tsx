'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Shortcut } from '@/components/shortcut'
import { Button } from '@/components/ui/button'
import { useHideSidebar } from './context/hide-sidebar'

type ButtonData = {
  tooltip: string
  icon: JSX.Element
  shortcut?: string
}

export function ButtonsWithTooltip({ items }: { items: ButtonData[] }) {
  const { setIsSidebar } = useHideSidebar()

  return (
    <TooltipProvider delayDuration={0}>
      {items.map(({ tooltip, icon, shortcut }) => (
        <Tooltip key={tooltip}>
          <TooltipTrigger asChild>
            {tooltip === 'hide sidebar' ? (
              <Button
                onClick={() => setIsSidebar((prev) => !prev)}
                size='icon'
                variant='ghost'
                className='shrink-0 text-primary/70'
              >
                {icon}
              </Button>
            ) : (
              <Button size='icon' variant='ghost' className='shrink-0 text-primary/70'>
                {icon}
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent className='bg-primary/90 text-primary-foreground font-light flex items-center gap-2'>
            <span className='text-sm'>{tooltip}</span>
            {shortcut && <Shortcut className='text-primary-foreground bg-primary'>{shortcut}</Shortcut>}
          </TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  )
}
