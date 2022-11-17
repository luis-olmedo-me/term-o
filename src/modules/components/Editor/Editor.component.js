import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { Code, CodeInput, Highlight, Line, Wrapper } from './Editor.styles'

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

  const lines = value.split('\n')

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
          const letters = line.split('')

          return (
            <Line>
              {letters.map((letter, letterIndex) => {
                const styles = markup[letter] || {}

                return (
                  <span key={`${index}-${letterIndex}`} style={styles}>
                    {letter}
                  </span>
                )
              })}
            </Line>
          )
        })}
      </Code>
    </Wrapper>
  )
}

const markup = {
  '[': {
    color: 'red'
  }
}
