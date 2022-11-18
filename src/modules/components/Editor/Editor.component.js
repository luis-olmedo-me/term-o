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
          const lettersV2 = markupV2.reduce(
            (result, rule) => {
              return result.reduce((parsedResult, pieceOfResult, resultIndex) => {
                const isString = typeof pieceOfResult === 'string'

                if (isString) {
                  const [firstMatch] = pieceOfResult.match(rule.pattern) || []

                  return firstMatch
                    ? [
                        ...parsedResult,
                        ...insertInArray(
                          pieceOfResult.split(rule.pattern),
                          <span key={`${index}-${resultIndex}`} style={{ ...rule.style }}>
                            {firstMatch}
                          </span>
                        )
                      ]
                    : [...parsedResult, pieceOfResult]
                }

                return [...parsedResult, pieceOfResult]
              }, [])
            },
            [line]
          )

          return (
            <Line>
              <span>{lettersV2}</span>
            </Line>
          )
        })}
      </Code>
    </Wrapper>
  )
}

const markupV2 = [
  {
    pattern: /\[/g,
    style: { color: 'red', fontWeight: 'bold' }
  },
  {
    pattern: /\]/g,
    style: { color: 'red', fontWeight: 'bold' }
  },
  {
    pattern: /\{/g,
    style: { color: 'red', fontWeight: 'bold' }
  },
  {
    pattern: /\}/g,
    style: { color: 'red', fontWeight: 'bold' }
  },
  {
    pattern: /".+"/g,
    style: { color: 'green', fontWeight: 'bold' }
  },
  {
    pattern: /\d+/g,
    style: { color: 'purple', fontWeight: 'bold' }
  },
  {
    pattern: /:/g,
    style: { color: 'cyan', fontWeight: 'bold' }
  }
]

function insertInArray(array, insertion) {
  return array.reduce((accumlator, item, index) => {
    const isLastIndex = index === array.length - 1

    return !isLastIndex ? [...accumlator, item, insertion] : [...accumlator, item]
  }, [])
}
