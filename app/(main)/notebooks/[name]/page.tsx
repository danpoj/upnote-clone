'use client'

import { useNotebooks } from '@/components/context/notebook'
import { Editor } from '@/components/editor/editor'
import { Loader } from '@/components/loader'
import { formatDate } from '@/lib/format-date'
import { cn } from '@/lib/utils'

import { MoreHorizontal, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
  params: { name: string }
}

export default function Page({ params: { name } }: Props) {
  const { getNotebook, isMount, selectedNoteIndex, setSelectedNoteIndex, addNote, deleteNote } = useNotebooks()

  const notebook = getNotebook(decodeURIComponent(name))

  useEffect(() => {
    setSelectedNoteIndex(0)
  }, [setSelectedNoteIndex])

  if (!isMount)
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Loader className='w-7 h-7' />
      </div>
    )

  if (isMount && !notebook) notFound()

  if (!notebook)
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Loader className='w-7 h-7' />
      </div>
    )

  return (
    <>
      {!isMount && (
        <div className='h-full flex items-center justify-center'>
          <Loader className='w-7 h-7' />
        </div>
      )}

      {isMount && notebook.notes.length === 0 && (
        <div className='h-full flex items-center justify-center'>
          <div className='flex flex-col gap-4 items-center'>
            <Image
              src={`/notebook-cover-images/cover-${notebook.imageIndex}.png`}
              alt='notebook cover image'
              width={106}
              height={134}
              className='rounded-lg shadow-lg'
            />
            <p className='text-sm text-primary/60 mt-4'>Have a thought to jot down? Tap on the button below.</p>
            <button onClick={() => addNote(name)} className='text-blue-600'>
              New Note
            </button>
          </div>
        </div>
      )}

      {isMount && notebook.notes.length > 0 && (
        <div className='h-full flex overflow-y-hidden'>
          <div className='w-72 shrink-0 border-r'>
            <div className='bg-primary/5 px-4 h-10 flex items-center justify-between gap-4'>
              <span className='text-sm truncate'>{notebook.name}</span>
              <button>
                <MoreHorizontal className='stroke-[1.5px] w-5 h-5' />
              </button>
            </div>

            <section className='h-full overflow-y-scroll pb-10'>
              {notebook.notes.map((note, index) => {
                const date = new Date(note.createdAt)
                const formattedDate = formatDate(note.createdAt)

                return (
                  <button
                    onClick={() => setSelectedNoteIndex(index)}
                    key={date.getTime()}
                    className={cn(
                      'p-4 flex flex-col gap-4 tracking-tight w-full border-b group',
                      selectedNoteIndex === index && 'bg-indigo-100'
                    )}
                  >
                    <h3 className='font-semibold truncate w-full text-start'>
                      {note.title === '' ? 'New Note' : note.title}
                    </h3>
                    <p className='text-primary/70 font-light text-sm truncate w-full text-start'>
                      {note.subTitle === '' ? 'No additional text' : note.subTitle}
                    </p>

                    <div className='flex items-center w-full'>
                      <span className='text-primary/40 text-xs'>{formattedDate}</span>
                      <button
                        onClick={() => deleteNote(name, index)}
                        className='hidden group-hover:block ml-auto text-primary/60 hover:text-red-500'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </div>
                  </button>
                )
              })}
            </section>
          </div>

          <div className='w-full'>
            <div className='bg-primary/5 px-4 h-10'></div>
            <div className='h-full relative p-4 overflow-y-scroll pb-10'>
              <Editor
                name={notebook.name}
                key={selectedNoteIndex + '/' + notebook.notes.length}
                content={notebook.notes[selectedNoteIndex].content}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
