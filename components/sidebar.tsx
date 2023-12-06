'use client'

import { Allnotes } from './all-notes'
import { useHideSidebar } from './context/hide-sidebar'
import { Notebooks } from './notebooks'

export function Sidebar() {
  const { isSidebar } = useHideSidebar()

  if (!isSidebar) return

  return (
    <aside className='border-r w-[240px] overflow-y-scroll shrink-0'>
      <Allnotes />
      <Notebooks />

      <div className='flex flex-col'>
        {['tags', 'templates', 'trash'].map((item) => (
          <button
            key={item}
            className='flex items-center gap-2 text-blue-700 uppercase text-sm pl-7 py-2.5 hover:bg-primary/5'
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  )
}
