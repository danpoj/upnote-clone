import { debounce } from '@/lib/debounce'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { $getRoot, EditorState } from 'lexical'
import { Note, useNotebooks } from '@/components/context/notebook'

type Props = {
  name: string
}

export default function OnchangePlugin({ name }: Props) {
  const { updateNote } = useNotebooks()

  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const content = JSON.stringify(editorState)
      const root = $getRoot()

      const cached = root.__cachedText?.split('\n').filter((text) => text.trim() !== '')

      if (!cached) return

      const newNote: Note = {
        title: cached.length === 0 ? '' : cached[0],
        subTitle: cached.length <= 1 ? '' : cached[1],
        content,
        createdAt: new Date(),
      }

      updateNote(name, newNote)
    })
  }

  return <OnChangePlugin onChange={debounce(onChange, 500)} />
}
