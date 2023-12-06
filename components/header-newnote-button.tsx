'use client'

import { usePathname } from 'next/navigation'
import { useNotebooks } from './context/notebook'
import { Button } from './ui/button'

export function HeaderNewnoteButton() {
  const name = decodeURIComponent(usePathname().split('/')[2])
  const { addNote } = useNotebooks()

  const onClick = () => addNote(name)

  return (
    <Button onClick={onClick} variant='indigo' size='sm'>
      New Note
    </Button>
  )
}
