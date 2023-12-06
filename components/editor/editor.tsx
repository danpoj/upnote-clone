import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { AutoFocusPlugin } from './plugins/autofocus-plugin'
import OnchangePlugin from './plugins/onchange-plugin'

type Props = {
  name: string
  content: string
}

export const Editor = ({ name, content }: Props) => {
  const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    onError: (e: Error) => console.error(e),
    editorState: content,
    theme: {},
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable className='h-full focus:outline-none' />}
        placeholder={<p className='absolute top-4 text-primary/30'>Enter some text...</p>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnchangePlugin name={name} />
    </LexicalComposer>
  )
}
