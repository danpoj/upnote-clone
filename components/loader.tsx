import { cn } from '@/lib/utils'
import { Loader as LoadingIcon } from 'lucide-react'

export const Loader = ({ className }: { className?: string }) => {
  return <LoadingIcon className={cn('w-5 h-5 stroke-primary/60 animate-spin', className)} />
}
