import * as React from 'preact'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { useTheme } from 'styled-components'
import { EditorLine } from './component/EditorLine'

import { Code, CodeInput, Wrapper } from './Editor.styles'

export const Editor = ({ value: defaultValue }) => {
  const theme = useTheme()

  const codeRef = useRef(null)
  const codeInputRef = useRef(null)

  const [value, setValue] = useState(defaultValue)

  const simulateScrollOnCode = event => {
    codeRef.current.scrollTop = event.target.scrollTop
    codeRef.current.scrollLeft = event.target.scrollLeft
  }

  useEffect(() => {
    codeInputRef.current.setAttribute('spellcheck', 'false')
  })

  const lines = value.split('\n')

  const themeHighlight = useMemo(() => getHighlightTheme(theme), [theme])

  return (
    <Wrapper>
      <CodeInput
        ref={codeInputRef}
        value={value}
        onChange={event => setValue(event.target.value)}
        onScroll={simulateScrollOnCode}
      />

      <Code ref={codeRef}>
        {lines.map((line, index) => {
          return <EditorLine key={index} text={line || ' '} theme={themeHighlight} />
        })}
      </Code>
    </Wrapper>
  )
}

const getHighlightTheme = theme => [
  {
    pattern: /\[/g,
    style: { color: theme.blue[900], fontWeight: 'bold' }
  },
  {
    pattern: /\]/g,
    style: { color: theme.blue[900], fontWeight: 'bold' }
  },
  {
    pattern: /\{/g,
    style: { color: theme.blue[900], fontWeight: 'bold' }
  },
  {
    pattern: /\}/g,
    style: { color: theme.blue[900], fontWeight: 'bold' }
  },
  {
    pattern: /"[^"]+"/g,
    style: { color: theme.green[700], fontWeight: 'bold' }
  },
  {
    pattern: /\d+/g,
    style: { color: theme.purple[800], fontWeight: 'bold' }
  },
  {
    pattern: /:/g,
    style: { color: theme.cyan[700], fontWeight: 'bold' }
  }
]
