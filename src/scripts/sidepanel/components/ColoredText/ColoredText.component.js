import * as React from 'preact'
import { useMemo } from 'preact/hooks'

import colorSet from '../../../../libs/color-set'
import { convertStringToObjects } from './ColoredText.helpers'
import * as S from './ColoredText.styles'

export const ColoredText = ({ value }) => {
  const sections = useMemo(() => convertStringToObjects(value), [value, colorSet.name])

  return (
    <>
      {sections.map(({ color, content }, index) => (
        <S.Text key={index} color={color}>
          {content}
        </S.Text>
      ))}
    </>
  )
}

ColoredText.propTypes = {
  value: Object
}
