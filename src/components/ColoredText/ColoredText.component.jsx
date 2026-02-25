import { useMemo } from 'preact/hooks'

import { getBorderClass, getPaintedFragments } from './ColoredText.helpers'
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
        const className = getBorderClass(fragments, index)

        return (
          fragment.value && (
            <span
              key={`${index}-${fragment.value}`}
              data-bgcolor={fragment.bgcolor}
              data-color={fragment.color}
              data-is-keyword={fragment.isKeyword}
              data-hide-aritificial-spaces={hideArtificialSpaces}
              className={`${text} ${fragmentClassName} ${className}`}
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
