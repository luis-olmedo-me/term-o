import { useMemo } from 'preact/hooks'

import { getBorderClass, getPaintedFragments } from './ColoredText.helpers'
import { text } from './ColoredText.module.scss'

export const ColoredText = ({ value, keywordsEnabled = false }) => {
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
              className={`${text} ${className}`}
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
  keywordsEnabled: Boolean
}
