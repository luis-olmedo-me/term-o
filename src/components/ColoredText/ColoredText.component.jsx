import { useMemo } from 'preact/hooks'

import { getClassByBorderType, getPaintedFragments } from './ColoredText.helpers'
import { text, text__bg_spaced, text__keyword } from './ColoredText.module.scss'

export const ColoredText = ({
  value,
  keywordsEnabled = false,
  hideArtificialSpaces = false,
  fragmentClassName = ''
}) => {
  const fragments = useMemo(
    () => getPaintedFragments(value, keywordsEnabled),
    [value, keywordsEnabled]
  )

  return (
    <>
      {fragments.map((fragment, index) => {
        const classByBorderType = getClassByBorderType(fragment.borderType)

        return (
          fragment.value && (
            <span
              key={`${index}-${fragment.value}`}
              data-bgcolor={fragment.bgcolor}
              data-color={fragment.color}
              className={`
                ${text}
                ${classByBorderType}
                ${fragment.isKeyword ? text__keyword : ''}
                ${hideArtificialSpaces ? '' : text__bg_spaced}
                ${fragmentClassName}
              `}
            >
              {fragment.value}
            </span>
          )
        )
      })}
    </>
  )
}

ColoredText.propTypes = {
  value: Object,
  keywordsEnabled: Boolean,
  hideArtificialSpaces: Boolean,
  fragmentClassName: String
}
