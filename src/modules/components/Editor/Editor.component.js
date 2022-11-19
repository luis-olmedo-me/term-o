import { commander } from 'libs/commander'
import * as React from 'preact'
import { useEffect, useMemo, useRef } from 'preact/hooks'

import { useTheme } from 'styled-components'
import { EditorLine } from './component/EditorLine'

import { Code, CodeInput, CodeTextarea, Wrapper } from './Editor.styles'

export const Editor = ({
  topLevelReference,
  value,
  onChange,
  onKeyDown,
  onKeyUp,
  onBlur,
  language,
  inline,
  inputStyles
}) => {
  const theme = useTheme()

  const codeRef = useRef(null)
  const codeInputRef = useRef(null)

  const simulateScrollOnCode = () => {
    codeRef.current.scrollTop = codeInputRef.current.scrollTop
    codeRef.current.scrollLeft = codeInputRef.current.scrollLeft
  }
  const updateScroll = () => setTimeout(simulateScrollOnCode, 100)

  useEffect(() => {
    codeInputRef.current.setAttribute('spellcheck', 'false')
  }, [])

  const lines = value.split('\n')

  const themeHighlight = useMemo(() => language(theme), [
    theme,
    language,
    commander.aliases,
    commander.commands
  ])
  const Input = inline ? CodeInput : CodeTextarea

  return (
    <Wrapper inputStyles={inputStyles}>
      <Input
        ref={element => {
          codeInputRef.current = element
          if (topLevelReference) topLevelReference.current = element
        }}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        onScroll={simulateScrollOnCode}
        // onPaste={inline ? updateScroll : null}
      />

      <Code ref={codeRef}>
        {lines.map((line, index) => {
          return <EditorLine key={index} text={line || ' '} theme={themeHighlight} />
        })}
      </Code>
    </Wrapper>
  )
}
