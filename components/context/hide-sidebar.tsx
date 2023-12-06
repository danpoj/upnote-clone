'use client'

import { type ReactNode, useContext, createContext, useState, type Dispatch, type SetStateAction } from 'react'

type HideSidebar = {
  isSidebar: boolean
  setIsSidebar: Dispatch<SetStateAction<boolean>>
}

const HideSidebarContext = createContext<HideSidebar | null>(null)

export const HideSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebar, setIsSidebar] = useState(true)

  return (
    <HideSidebarContext.Provider
      value={{
        isSidebar,
        setIsSidebar,
      }}
    >
      {children}
    </HideSidebarContext.Provider>
  )
}

export const useHideSidebar = () => {
  const context = useContext(HideSidebarContext)

  if (!context) throw new Error('useHideSidebar is used outside of HideSidebarProvider.')

  return context
}
