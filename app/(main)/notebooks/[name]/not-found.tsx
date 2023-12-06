import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='w-full h-full flex items-center justify-center flex-col gap-4'>
      <span>Notebook not found.</span>
      <Link href='/notebooks' className={buttonVariants()}>
        Add New Notebook <ArrowRight className='w-5 h-5 ml-2' />
      </Link>
    </div>
  )
}
