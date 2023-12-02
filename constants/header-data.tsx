import { ChevronLeft, ChevronRight, Copy as WindowsOnTop, Menu, RotateCw, Settings } from 'lucide-react'

export const leftButtons = [
  {
    tooltip: 'hide sidebar',
    icon: <Menu className='stroke-[1.5px] w-6 h-6' />,
    shortcut: '⌘↑\\',
  },
  {
    tooltip: 'back',
    icon: <ChevronLeft className='stroke-[1.5px] w-7 h-7' />,
    shortcut: '⌘↑[',
  },
  {
    tooltip: 'forward',
    icon: <ChevronRight className='stroke-[1.5px] w-7 h-7' />,
    shortcut: '⌘↑]',
  },
  {
    tooltip: 'sync notes',
    icon: <RotateCw className='stroke-[1.5px] w-5 h-5' />,
  },
]

export const rightButtons = [
  {
    tooltip: 'keep window on top',
    icon: <WindowsOnTop className='stroke-[1.5px] w-5 h-5' />,
    shortcut: '⌘↑K',
  },
  {
    tooltip: 'settings',
    icon: <Settings className='stroke-[1.5px] w-5 h-5' />,
    shortcut: '⌘,',
  },
]
