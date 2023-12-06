'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Lock } from 'lucide-react'
import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useNotebooks } from '../context/notebook'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

type Props = { children: ReactNode; isTooltip?: boolean }

const formSchema = z.object({
  name: z.string().min(1),
})

export function CreateNotebookModal({ children, isTooltip = true }: Props) {
  const [imageIndex, setImageIndex] = useState<number>()
  const { notebooks, setNotebooks } = useNotebooks()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = ({ name }: z.infer<typeof formSchema>) => {
    if (!imageIndex) {
      console.warn('no image index')
      return
    }

    const isExistingName = !!notebooks.find((notebook) => notebook.name === name)

    if (isExistingName) {
      alert('Notebook Name already exist.')
      return
    }

    setNotebooks([{ name, imageIndex, notes: [] }, ...notebooks])

    setOpen(false)
    setImageIndex(undefined)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isTooltip ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>{children}</DialogTrigger>
            </TooltipTrigger>
            <TooltipContent className='bg-primary/90 text-primary-foreground font-light'>New Notebooks</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <DialogTrigger asChild>{children}</DialogTrigger>
      )}
      <DialogContent className='max-w-[34rem]'>
        <DialogHeader className='mb-6'>
          <DialogTitle className='text-center text-xl font-light'>Create New Notebook</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                      priority
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

            <DialogFooter>
              <Button
                disabled={!form.formState.isValid || !imageIndex}
                type='submit'
                size='sm'
                className='capitalize disabled:bg-primary-foreground disabled:border disabled:text-primary disabled:border-primary/40 px-6'
              >
                create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
