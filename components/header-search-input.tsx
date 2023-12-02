'use client'

import { Search } from 'lucide-react'
import { Shortcut } from './shortcut'
import { useCallback, useEffect, useRef, useState } from 'react'

export function HeaderSearchInput() {
  const [isShortcut, setIsShortcut] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const show = useCallback(() => setIsShortcut(true), [])
  const hide = useCallback(() => setIsShortcut(false), [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
        e.preventDefault()

        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className='relative mx-4' onMouseEnter={show} onMouseLeave={hide}>
      <input
        ref={inputRef}
        type='text'
        className='border rounded-lg p-1.5 pl-8 font-light hover:border-blue-500 transition'
        placeholder='Search'
      />
      <Search className='stroke-[1.5px] w-[17px] h-[17px] stroke-primary/80 absolute top-1/2 -translate-y-1/2 left-2' />

      {isShortcut && <Shortcut className='absolute right-2 top-1/2 -translate-y-1/2'>⌘F</Shortcut>}
    </div>
  )
}
