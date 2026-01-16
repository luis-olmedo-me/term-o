import { useMemo } from 'preact/hooks'

import { getBackgroundedSections } from './ColoredText.helpers'
import { nextColored, previousColored, text, uniqueColored } from './ColoredText.module.scss'

const getBgBorderMod = (sections, sectionIndex) => {
  const nextSection = sections[sectionIndex + 1]
  const previousSection = sections[sectionIndex - 1]

  const isNextColored = !!nextSection && nextSection?.bgcolor !== 'reset'
  const isPreviousColored = !!previousSection && previousSection?.bgcolor !== 'reset'

  if (isNextColored && !isPreviousColored) return nextColored
  if (isPreviousColored && !isNextColored) return previousColored
  return uniqueColored
}

export const ColoredText = ({ value }) => {
  const sections = useMemo(() => getBackgroundedSections(value), [value])

  return (
    <>
      {sections.map(({ bgcolor, content }, sectionIndex) => {
        const sectionMod = getBgBorderMod(sections, sectionIndex)

        return (
          <span className={sectionMod} key={sectionIndex} data-bgcolor={bgcolor}>
            {content.map(({ color, content }, index) => (
              <span className={text} key={`${sectionIndex}-${index}`} data-color={color}>
                {content}
              </span>
            ))}
          </span>
        )
      })}
    </>
  )
}

ColoredText.propTypes = {
  value: Object
}
