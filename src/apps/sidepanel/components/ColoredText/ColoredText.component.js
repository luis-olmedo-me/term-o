import * as React from 'preact'
import { useMemo } from 'preact/hooks'

import { convertStringToObjects } from './ColoredText.helpers'
import * as S from './ColoredText.styles'

export const ColoredText = ({ value }) => {
  const sections = useMemo(() => convertStringToObjects(value), [value])

  return (
    <>
      {sections.map(({ color, bgcolor, content }, index) => (
        <S.Text key={index} aria-color={color} aria-bg-color={bgcolor}>
          {content}
        </S.Text>
      ))}
    </>
  )
}

ColoredText.propTypes = {
  value: Object
}
