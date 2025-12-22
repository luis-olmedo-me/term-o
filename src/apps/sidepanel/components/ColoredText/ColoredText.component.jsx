import * as React from 'preact'
import { useMemo } from 'preact/hooks'

import { convertStringToObjects } from './ColoredText.helpers'
import { text } from './ColoredText.module.scss'

export const ColoredText = ({ value }) => {
  const sections = useMemo(() => convertStringToObjects(value), [value])

  return (
    <>
      {sections.map(({ color, bgcolor, content }, index) => {
        const colorClass = `termo-color-${color ?? 'none'}`
        const bgcolorClass = `termo-bgcolor-${bgcolor ?? 'none'}`

        return (
          <span className={`${text} ${bgcolorClass} ${colorClass}`} key={index}>
            {content}
          </span>
        )
      })}
    </>
  )
}

ColoredText.propTypes = {
  value: Object
}
