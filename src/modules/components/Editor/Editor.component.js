import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { Code, CodeInput, Wrapper } from './Editor.styles'

export const Editor = ({ value: defaultValue }) => {
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

  return (
    <Wrapper>
      <CodeInput
        ref={codeInputRef}
        value={value}
        onChange={event => setValue(event.target.value)}
        onScroll={simulateScrollOnCode}
      />

      <Code ref={codeRef}>{value}</Code>
    </Wrapper>
  )
}
