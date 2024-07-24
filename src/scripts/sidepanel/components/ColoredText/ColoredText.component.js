import * as React from 'preact'
import { useMemo } from 'preact/hooks'

import themer from '@src/libs/themer'
import { convertStringToObjects } from './ColoredText.helpers'
import * as S from './ColoredText.styles'

export const ColoredText = ({ value }) => {
  const sections = useMemo(() => convertStringToObjects(value), [value, themer.colorTheme.name])

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
