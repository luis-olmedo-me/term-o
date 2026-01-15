import { useMemo } from 'preact/hooks'

import { getBackgroundedSections } from './ColoredText.helpers'
import { text } from './ColoredText.module.scss'

export const ColoredText = ({ value }) => {
  const sections = useMemo(() => getBackgroundedSections(value), [value])

  return (
    <>
      {sections.map(({ bgcolor, content }, sectionIndex) => (
        <span className={text} key={sectionIndex} data-bgcolor={bgcolor}>
          {content.map(({ color, content }, index) => (
            <span className={text} key={`${sectionIndex}-${index}`} data-color={color}>
              {content}
            </span>
          ))}
        </span>
      ))}
    </>
  )
}

ColoredText.propTypes = {
  value: Object
}
