'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Lock } from 'lucide-react'
import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Notebook, useNotebooks } from '../context/notebook'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type Props = { children: ReactNode; itemIndex: number } & Notebook

const formSchema = z.object({
  name: z.string().min(1),
})

export function UpdateNotebookModal({ children, ...initial }: Props) {
  const [imageIndex, setImageIndex] = useState<number>(initial.imageIndex)
  const { notebooks, deleteNotebook, updateNotebook } = useNotebooks()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initial.name,
    },
  })

  const onUpdate = ({ name }: z.infer<typeof formSchema>) => {
    if (!imageIndex) {
      console.warn('no image index.')
      return
    }

    const isExistingName = !!notebooks.find((notebook) => notebook.name === name) && name !== initial.name

    if (isExistingName) {
      alert('Notebook Name already exist.')
      return
    }

    updateNotebook({
      index: initial.itemIndex,
      newData: {
        name,
        imageIndex,
        notes: initial.notes,
      },
    })

    setOpen(false)

    form.reset()
  }

  const onDelete = () => {
    deleteNotebook(initial.itemIndex)

    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }}
      >
        {children}
      </DialogTrigger>

      <DialogContent className='max-w-[34rem]'>
        <DialogHeader className='mb-6'>
          <DialogTitle className='text-center text-xl font-light'>Edit Notebook</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className='space-y-8'>
            {/* name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex items-center'>
                  <FormLabel htmlFor='name' className='capitalize min-w-[6rem]'>
                    name
                  </FormLabel>
                  <FormControl>
                    <Input id='name' placeholder='Enter notebook name' className='bg-primary/5 font-light' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* lock */}
            <div className='flex items-center'>
              <Label htmlFor='lock' className='capitalize min-w-[6rem]'>
                lock
              </Label>

              <div className='flex gap-2'>
                <div className='relative w-11 bg-primary/10 h-6 rounded-xl cursor-not-allowed'>
                  <div className='absolute left-px bg-primary-foreground/90 w-[20px] h-[20px] top-1/2 -translate-y-1/2 rounded-full' />
                </div>

                <div className='flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full p-[5px]'>
                  <Lock className='w-full h-full stroke-yellow-600' />
                </div>
              </div>
            </div>

            {/* cover */}
            <div className='flex items-center border-b'>
              <Label htmlFor='cover' className='capitalize min-w-[6rem]'>
                cover
              </Label>

              <div className='w-full h-52 overflow-y-scroll grid grid-cols-5 gap-6 p-4 pl-0'>
                {Array.from({ length: 48 }).map((_, i) => (
                  <button
                    type='button'
                    onClick={() => setImageIndex(i + 1)}
                    key={i}
                    className='h-[4.6rem] rounded overflow-hidden relative'
                  >
                    <Image
                      src={`/notebook-cover-images/cover-${i + 1}.png`}
                      width={106}
                      height={134}
                      alt='notebook cover'
                      className='object-cover w-full h-full'
                    />

                    {i + 1 === imageIndex && (
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-6 h-6 bg-black/60 rounded-full flex items-center justify-center p-1'>
                          <Check className='stroke-white' />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex w-full'>
              <button onClick={onDelete} type='button' className='capitalize mr-auto text-red-500'>
                delete
              </button>
              <Button
                disabled={!form.formState.isValid || !imageIndex}
                type='submit'
                size='sm'
                className='capitalize disabled:bg-primary-foreground disabled:border disabled:text-primary disabled:border-primary/40 px-6 max-w-fit'
              >
                create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
