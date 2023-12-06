import { Skeleton } from './ui/skeleton'

export const NotebooksLayoutSkeleton = () => {
  return (
    <div className='h-full grid grid-cols-2 gap-6 sm:gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 place-content-start sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8'>
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className='rounded-lg overflow-hidden h-40 aspect-[108/134]' />
      ))}
    </div>
  )
}
