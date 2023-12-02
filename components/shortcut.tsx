import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export function Shortcut({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('text-primary/60 bg-primary/10 px-1.5 py-0.5 rounded text-xs pointer-events-none', className)}
    >
      {children}
    </div>
  )
}
