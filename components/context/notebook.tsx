'use client'

import { loadEditorContent } from '@/lib/load-editor-content'
import {
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react'

export type Note = {
  title: string
  subTitle: string
  content: string
  createdAt: Date
}

export type Notebook = {
  name: string
  imageIndex: number
  notes: Note[]
}

type Props = {
  notebooks: Notebook[]
  setNotebooks: Dispatch<SetStateAction<Notebook[]>>
  getNotebook: (name: string) => Notebook | undefined
  deleteNotebook: (index: number) => { redirect: boolean }
  updateNotebook: ({ index, newData }: { index: number; newData: Notebook }) => void
  selectedNoteIndex: number
  setSelectedNoteIndex: Dispatch<SetStateAction<number>>
  updateNote: (name: string, newNote: Note) => void
  addNote: (name: string) => void
  deleteNote: (name: string, noteIndex: number) => void
  isMount: boolean
}

const NotebookContext = createContext<Props | null>(null)

export const NotebookProvider = ({ children }: { children: ReactNode }) => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [isMount, setIsMount] = useState(false)
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0)

  const getNotebook = useCallback(
    (name: string) => {
      return notebooks.find((notebook) => notebook.name === name)
    },
    [notebooks]
  )

  const deleteNotebook = useCallback((index: number) => {
    const answer = confirm(`Are you sure to delete notebook?`)
    if (!answer) return { redirect: false }

    setNotebooks((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])

    return { redirect: true }
  }, [])

  const updateNotebook = useCallback(({ index, newData }: { index: number; newData: Notebook }) => {
    setNotebooks((prev) => [
      ...prev.slice(0, index),
      {
        ...prev.slice(index, 1),
        ...newData,
      },
      ...prev.slice(index + 1),
    ])
  }, [])

  const addNote = useCallback(
    (name: string) => {
      const notebook = getNotebook(decodeURIComponent(name))

      if (!notebook) {
        console.warn(`There is no notebook. please add New Note in notebook page.`)
        return
      }

      const index = notebooks.findIndex((book) => book.name === notebook.name)

      const newNote = { title: '', subTitle: '', content: loadEditorContent(), createdAt: new Date() }

      setNotebooks((prev) => [
        ...prev.slice(0, index),
        {
          ...notebook,
          notes: [newNote, ...notebook.notes],
        },
        ...prev.slice(index + 1),
      ])

      setSelectedNoteIndex(0)
    },
    [getNotebook, notebooks]
  )

  const updateNote = useCallback(
    (name: string, newNote: Note) => {
      const notebook = getNotebook(decodeURIComponent(name))

      if (!notebook) {
        console.warn(`There is no notebook. please add New Note in notebook page.`)
        return
      }

      const index = notebooks.findIndex((book) => book.name === notebook.name)

      setNotebooks((prev) => [
        ...prev.slice(0, index),
        {
          ...notebook,
          notes: [
            ...notebook.notes.slice(0, selectedNoteIndex),
            newNote,
            ...notebook.notes.slice(selectedNoteIndex + 1),
          ],
        },
        ...prev.slice(index + 1),
      ])
    },
    [getNotebook, notebooks, selectedNoteIndex]
  )

  const deleteNote = useCallback(
    (name: string, noteIndex: number) => {
      const notebook = getNotebook(decodeURIComponent(name))

      if (!notebook) return

      const answer = confirm(`Are you sure to delete note?`)
      if (!answer) return

      const notebookIndex = notebooks.findIndex((book) => book.name === notebook!.name)

      setNotebooks((prev) => [
        ...prev.slice(0, notebookIndex),
        {
          ...notebook,
          notes: [...notebook.notes.slice(0, noteIndex), ...notebook.notes.slice(noteIndex + 1)],
        },
        ...prev.slice(notebookIndex + 1),
      ])
    },
    [getNotebook, notebooks]
  )

  useEffect(() => {
    const localStorageNotebooks = localStorage.getItem('notebooks')

    if (localStorageNotebooks) {
      setNotebooks(JSON.parse(localStorageNotebooks))
    }

    setIsMount(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('notebooks', JSON.stringify(notebooks))
  }, [notebooks])

  return (
    <NotebookContext.Provider
      value={{
        notebooks,
        setNotebooks,
        getNotebook,
        deleteNotebook,
        updateNotebook,
        selectedNoteIndex,
        setSelectedNoteIndex,
        updateNote,
        addNote,
        deleteNote,
        isMount,
      }}
    >
      {children}
    </NotebookContext.Provider>
  )
}

export const useNotebooks = () => {
  const context = useContext(NotebookContext)

  if (!context) throw new Error('useNotebooks is used outside of NotebookProvider.')

  return context
}
