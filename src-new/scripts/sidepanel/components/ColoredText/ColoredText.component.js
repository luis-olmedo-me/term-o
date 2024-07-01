import * as React from 'preact'

import { useMemo } from 'preact/hooks'
import { convertStringToObjects } from './ColoredText.helpers'
import * as S from './ColoredText.styles'

export const ColoredText = ({ value }) => {
  const sections = useMemo(() => convertStringToObjects(value), [value])

  return (
    <>
      {sections.map(({ color, content }) => (
        <S.Text color={color}>{content}</S.Text>
      ))}
    </>
  )
}
