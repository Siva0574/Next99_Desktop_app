import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { FontSize } from './fontSizeExtension'
import './tiptap.css'

interface Props {
  initialContent?: string
  fontSize?: number
  onContentChange?: (newContent: string) => void
}

const TextWidget = ({ initialContent = '', fontSize = 16, onContentChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, FontSize],
    content: initialContent || '<p>Start writing...</p>',
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      onContentChange?.(content)
    },
    onCreate: ({ editor }) => {
      // First time set font size
      editor.chain().setMark('textStyle', { fontSize }).run()
    }
  })

  // When fontSize changes from settings panel
  useEffect(() => {
    if (editor && fontSize) {
      editor.chain().focus().setMark('textStyle', { fontSize }).run()
    }
  }, [editor, fontSize])

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 10,marginTop:'20px',position:"relative" }}>
      {editor && (
        <div style={{ marginBottom: 8 }}>
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            <b>B</b>
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <i>I</i>
          </button>
          <button onClick={() => editor.chain().focus().undo().run()}>↶ Undo</button>
          <button onClick={() => editor.chain().focus().redo().run()}>↷ Redo</button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
    
  )
}

export default TextWidget
