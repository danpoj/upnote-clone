import { Loader } from '@/components/loader'

export default function Loading() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Loader className='w-7 h-7 animate-spin' />
    </div>
  )
}
