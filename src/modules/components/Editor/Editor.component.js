import * as React from 'preact'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { useTheme } from 'styled-components'

import { Code, CodeInput, Line, Wrapper } from './Editor.styles'

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
          const lettersV2 = themeHighlight.reduce(
            (result, rule) => {
              return result.reduce((parsedResult, pieceOfResult, resultIndex) => {
                const isString = typeof pieceOfResult === 'string'

                if (isString) {
                  const matches = pieceOfResult.match(rule.pattern) || []

                  return matches.length
                    ? [
                        ...parsedResult,
                        ...insertInArray(
                          pieceOfResult.split(rule.pattern),
                          matches.map((match, matchIndex) => (
                            <span
                              key={`${index}-${resultIndex}-${matchIndex}`}
                              style={{ ...rule.style }}
                            >
                              {match}
                            </span>
                          ))
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
            <Line key={index}>
              <span>{lettersV2}</span>
            </Line>
          )
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

function insertInArray(array, matches) {
  return array.reduce((accumlator, item, index) => {
    const match = matches[index]

    return match ? [...accumlator, item, match] : [...accumlator, item]
  }, [])
}
