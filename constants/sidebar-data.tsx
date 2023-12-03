import { Calendar, CheckSquare2, CloudOff, Filter, Share2 } from 'lucide-react'

export const allNotes = [
  {
    text: 'todo',
    icon: <CheckSquare2 className='w-[1.05rem] h-[1.05rem] stroke-red-600' />,
  },
  {
    text: 'shared notes',
    icon: <Share2 className='w-[1.05rem] h-[1.05rem] stroke-blue-600' />,
  },
  {
    text: 'today',
    icon: <Calendar className='w-[1.05rem] h-[1.05rem] stroke-cyan-600' />,
  },
  {
    text: 'uncategorized',
    icon: <Filter className='w-[1.05rem] h-[1.05rem] stroke-teal-600' />,
  },
  {
    text: 'unsynced',
    icon: <CloudOff className='w-[1.05rem] h-[1.05rem] stroke-fuchsia-600' />,
  },
]
