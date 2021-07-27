import React from 'react'

import { LineInterpreter } from './sub-components/LineInterpreter/LineInterpreter.component'

export const HistoryInterpreter = ({
  historyRef,
  histories,
  className,
  lineClassName,
  commandKeywords,
  onClick,
  palette
}) => {
  return (
    <div ref={historyRef} className={className} onClick={onClick}>
      {histories.map((history, historyIndex) => {
        return (
          <div className={lineClassName} key={historyIndex}>
            {history.map((line, lineIndex) => {
              const id = `${historyIndex}-${lineIndex}`

              return (
                <LineInterpreter
                  {...line}
                  palette={palette}
                  key={id}
                  id={id}
                  commandKeywords={commandKeywords}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
