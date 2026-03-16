import { useMemo } from 'preact/hooks'

import { getPaintedFragments } from './ColoredText.helpers'
import { text, text__bg_spaced } from './ColoredText.module.scss'

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
        return (
          fragment.value && (
            <span
              key={`${index}-${fragment.value}`}
              data-bgcolor={fragment.bgcolor}
              data-color={fragment.color}
              data-is-keyword={fragment.isKeyword}
              className={`
                ${text}
                ${fragment.borderClassName}
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
