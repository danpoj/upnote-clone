'use client'

import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { ChevronDown, Pencil, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useNotebooks } from './context/notebook'
import { CreateNotebookModal } from './modal/create-notebook-modal'
import { UpdateNotebookModal } from './modal/update-notebook-modal'

export function Notebooks() {
  const [isOpen, setIsOpen] = useState(true)
  const { notebooks, isMount, deleteNotebook } = useNotebooks()
  const pathname = decodeURIComponent(usePathname().split('/')[2])
  const router = useRouter()

  const onDeleteNotebook = (index: number) => {
    const { redirect } = deleteNotebook(index)

    if (redirect === false) return

    router.push('/notebooks')
  }

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
        <Link href='/notebooks' className='flex items-center gap-2 text-blue-700 uppercase text-sm w-full h-9'>
          notebooks
        </Link>

        <CreateNotebookModal>
          <Button size='icon' variant='ghost' className='ml-auto '>
            <Plus className='stroke-blue-700 w-5 h-5' />
          </Button>
        </CreateNotebookModal>
      </div>
      <CollapsibleContent className='flex flex-col'>
        {isMount &&
          notebooks.map((notebook, i) => (
            <div
              key={notebook.name}
              className={cn('relative hover:bg-primary/5 group', pathname === notebook.name && 'bg-primary/5')}
            >
              <Link href={`/notebooks/${notebook.name}`} className='flex items-center gap-2 px-4 py-2'>
                <Image
                  src={`/notebook-cover-images/cover-${notebook.imageIndex}.png`}
                  alt='notebook cover image'
                  width={106}
                  height={134}
                  className='w-5 aspect-[106/134] rounded'
                />
                <p
                  className={cn(
                    'text-sm text-start w-full truncate',
                    pathname === notebook.name ? 'font-semibold' : 'font-light'
                  )}
                >
                  {notebook.name}
                  {notebook.notes.length > 0 && (
                    <span className='ml-2 font-light text-primary/60'>{notebook.notes.length}</span>
                  )}
                </p>
              </Link>

              <div className='hidden group-hover:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2'>
                <Button
                  onClick={() => onDeleteNotebook(i)}
                  size='icon'
                  variant='ghost'
                  className='w-6 h-6 p-1 text-primary/60 hover:text-red-500'
                >
                  <Trash2 />
                </Button>

                <UpdateNotebookModal {...notebook} itemIndex={i}>
                  <Button size='icon' variant='ghost' className='w-6 h-6 p-1 text-primary/60 hover:text-blue-500'>
                    <Pencil />
                  </Button>
                </UpdateNotebookModal>
              </div>
            </div>
          ))}

        {!isMount && (
          <div className='flex justify-center'>
            <Loader />
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
