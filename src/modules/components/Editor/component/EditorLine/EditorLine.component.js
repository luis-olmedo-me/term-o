import * as React from 'preact'

import { insertInArray } from './EditorLine.helpers'
import { Line } from './EditorLine.styles'

export const EditorLine = ({ text, theme }) => {
  const textThemed = theme.reduce(
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
                    <span key={`${resultIndex}-${matchIndex}`} style={{ ...rule.style }}>
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
    [text]
  )

  return (
    <Line>
      <span>{textThemed}</span>
    </Line>
  )
}
