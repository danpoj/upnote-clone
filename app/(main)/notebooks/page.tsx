'use client'

import { Notebook, useNotebooks } from '@/components/context/notebook'
import { Loader } from '@/components/loader'
import { CreateNotebookModal } from '@/components/modal/create-notebook-modal'
import { UpdateNotebookModal } from '@/components/modal/update-notebook-modal'
import { NotebooksLayoutSkeleton } from '@/components/skeletons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { AlignJustify, LayoutGrid, Library, Pencil, Plus, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Page() {
  const { notebooks, isMount } = useNotebooks()
  const [layout, setLayout] = useState<'grid' | 'line'>('grid')
  const [value, setValue] = useState('')

  const trimmedValue = value.trim()
  const filteredNotebooks =
    trimmedValue === '' ? notebooks : notebooks.filter((notebook) => notebook.name.includes(trimmedValue))

  return (
    <div className='w-full h-full pb-10'>
      <div className='flex justify-between items-center bg-primary/5 px-6 py-1 h-10'>
        <p className='font-light flex gap-1 items-center'>
          Notebooks
          {isMount ? <span className='text-primary/60'>({filteredNotebooks.length})</span> : <Loader />}
        </p>

        <div className='hidden md:flex items-center gap-2'>
          <div className='flex items-center'>
            <button
              onClick={() => setLayout('grid')}
              className={cn(
                'w-12 h-8 bg-primary-foreground text-primary/60 border rounded-l-sm transition-none flex items-center justify-center',
                layout === 'grid' && 'bg-primary/50 text-primary-foreground'
              )}
            >
              <LayoutGrid className='w-4 h-4 stroke-[1.5px]' />
            </button>
            <button
              onClick={() => setLayout('line')}
              className={cn(
                'w-12 h-8 bg-primary-foreground text-primary/60 border rounded-r-sm transition-none flex items-center justify-center',
                layout === 'line' && 'bg-primary/50 text-primary-foreground'
              )}
            >
              <AlignJustify className='w-4 h-4 stroke-[1.5px]' />
            </button>
          </div>
          <div className='relative'>
            <Input
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              className='pl-7 h-8 focus-visible:ring-0 focus-visible:ring-offset-0'
            />
            <Search className='w-[17px] h-[17px] text-primary/50 absolute top-1/2 -translate-y-1/2 left-2' />
          </div>

          <CreateNotebookModal isTooltip={false}>
            <Button size='icon' variant='ghost' className='w-8 h-8'>
              <Plus className='w-5 h-5 hover:text-blue-600' />
            </Button>
          </CreateNotebookModal>
        </div>
      </div>

      {isMount && notebooks.length > 0 && layout === 'grid' && <AllNotebooksGrid notebooks={filteredNotebooks} />}
      {isMount && notebooks.length > 0 && layout === 'line' && <AllNotebooksLine notebooks={filteredNotebooks} />}
      {isMount && notebooks.length === 0 && <EmptyNotebookPage />}
      {!isMount && <NotebooksLayoutSkeleton />}
    </div>
  )
}

function AllNotebooksGrid({ notebooks }: { notebooks: Notebook[] }) {
  return (
    <div className='h-full grid grid-cols-2 gap-6 sm:gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 place-content-start sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8'>
      {notebooks.map((notebook, i) => (
        <div className='relative rounded-lg overflow-hidden group shadow-lg' key={notebook.name}>
          <Link href={`/notebooks/${notebook.name}`}>
            <Image
              src={`/notebook-cover-images/cover-${notebook.imageIndex}.png`}
              alt='notebook cover image'
              width={106}
              height={134}
              className='w-full aspect-[106/134]'
            />
            <p className='bg-black/60 absolute z-10 bottom-0 w-full px-2 py-2 truncate text-white font-light text-sm'>
              {notebook.name}
            </p>
          </Link>

          <UpdateNotebookModal {...notebook} itemIndex={i}>
            <button className='absolute right-2 top-2 w-8 h-8 bg-black/40 hover:bg-black/60 items-center justify-center p-2 rounded-full hidden group-hover:flex'>
              <Pencil className='text-white' />
            </button>
          </UpdateNotebookModal>
        </div>
      ))}
    </div>
  )
}

function AllNotebooksLine({ notebooks }: { notebooks: Notebook[] }) {
  return (
    <div className='grid grid-cols-1'>
      {notebooks.map((notebook, i) => (
        <div key={notebook.name} className='relative group hover:bg-primary/5'>
          <Link href={`/notebooks/${notebook.name}`} className='py-2 pl-6 pr-16 flex items-center gap-2 border-b'>
            <Image
              src={`/notebook-cover-images/cover-${notebook.imageIndex}.png`}
              alt='notebook cover image'
              width={106}
              height={134}
              className='rounded w-7 aspect-[106/134]'
            />
            <p className='text-sm font-light truncate'>{notebook.name}</p>
          </Link>

          <UpdateNotebookModal {...notebook} itemIndex={i}>
            <Button
              size='icon'
              variant='ghost'
              className='absolute right-4 top-2 w-9 h-9 items-center justify-center p-2 rounded-full hidden group-hover:flex'
            >
              <Pencil className='text-primary/60' />
            </Button>
          </UpdateNotebookModal>
        </div>
      ))}
    </div>
  )
}

function EmptyNotebookPage() {
  return (
    <div className='h-full flex flex-col gap-4 items-center justify-center'>
      <div className='bg-primary/10 w-[4.2rem] h-[4.2rem] p-4 flex items-center justify-center rounded-full'>
        <Library className='text-primary/60 w-full h-full' />
      </div>
      <p className='capitalize text-primary/60 text-sm text-center'>
        you can organize notes of same topic into notebooks.
      </p>
      <CreateNotebookModal isTooltip={false}>
        <button className='text-blue-600'>Create New Notebook</button>
      </CreateNotebookModal>
    </div>
  )
}
