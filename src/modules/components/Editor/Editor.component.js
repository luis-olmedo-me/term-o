import * as React from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import { EditableArea } from './Editor.styles'

export const Editor = ({ value }) => {
  const editorRef = useRef(null)

  useEffect(() => {
    editorRef.current.setAttribute('contenteditable', 'true')
    editorRef.current.setAttribute('spellcheck', 'false')
  }, [])

  const onChange = event => {
    console.log('event', event, event.target.innerText)
  }

  const lines = value.split('\n')

  return (
    <EditableArea ref={editorRef} onKeyDown={onChange} contenteditable="true">
      {lines.map(line => (
        <div>{line}</div>
      ))}
    </EditableArea>
  )
}
