import * as React from 'preact'
import * as S from './FieldRenderer.styles'

export const FieldRenderer = ({ text, onClick, fullWidth, fullHeight }) => {
  return (
    <S.ButtonWrapper onClick={onClick} fullWidth={fullWidth} fullHeight={fullHeight}>
      {text}
    </S.ButtonWrapper>
  )
}

FieldRenderer.propTypes = {
  text: String,
  onClick: Function,
  fullWidth: Boolean,
  fullHeight: Boolean
}
