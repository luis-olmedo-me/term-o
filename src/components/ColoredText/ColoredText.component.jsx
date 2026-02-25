import { useMemo } from 'preact/hooks'

import { getPaintedFragments } from './ColoredText.helpers'
import { text } from './ColoredText.module.scss'

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
              data-hide-aritificial-spaces={hideArtificialSpaces}
              className={`${text} ${fragmentClassName} ${fragment.borderClassName}`}
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
