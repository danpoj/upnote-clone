import { Allnotes } from './all-notes'
import { Notebooks } from './notebooks'

export function Sidebar() {
  return (
    <div className='border-r w-[240px]'>
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
    </div>
  )
}
