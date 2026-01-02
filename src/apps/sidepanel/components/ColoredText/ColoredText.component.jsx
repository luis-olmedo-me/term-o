import { useMemo } from 'preact/hooks'

import { convertStringToObjects } from './ColoredText.helpers'
import { text } from './ColoredText.module.scss'

export const ColoredText = ({ value }) => {
  const sections = useMemo(() => convertStringToObjects(value), [value])

  return (
    <>
      {sections.map(({ color, bgcolor, content }, index) => (
        <span className={text} key={index} data-color={color} data-bgcolor={bgcolor}>
          {content}
        </span>
      ))}
    </>
  )
}

ColoredText.propTypes = {
  value: Object
}
