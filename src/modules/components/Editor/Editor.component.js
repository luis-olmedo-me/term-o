import * as React from 'preact'
import { useEffect, useMemo, useRef } from 'preact/hooks'

import { useTheme } from 'styled-components'
import { EditorLine } from './component/EditorLine'

import { Code, CodeInput, CodeTextarea, Wrapper } from './Editor.styles'

export const Editor = ({ value, onChange, language, inline }) => {
  const theme = useTheme()

  const codeRef = useRef(null)
  const codeInputRef = useRef(null)

  const simulateScrollOnCode = event => {
    codeRef.current.scrollTop = event.target.scrollTop
    codeRef.current.scrollLeft = event.target.scrollLeft
  }

  useEffect(() => {
    codeInputRef.current.setAttribute('spellcheck', 'false')
  })

  const lines = value.split('\n')

  const themeHighlight = useMemo(() => language(theme), [theme, language])
  const Input = inline ? CodeInput : CodeTextarea

  return (
    <Wrapper>
      <Input ref={codeInputRef} value={value} onChange={onChange} onScroll={simulateScrollOnCode} />

      <Code ref={codeRef}>
        {lines.map((line, index) => {
          return <EditorLine key={index} text={line || ' '} theme={themeHighlight} />
        })}
      </Code>
    </Wrapper>
  )
}
