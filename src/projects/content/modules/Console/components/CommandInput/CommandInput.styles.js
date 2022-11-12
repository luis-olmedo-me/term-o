import { theme as t } from 'src/helpers/theme.helpers'
import styled from 'styled-components'

const radius = t('radius.100')

export const Input = styled.input`
  padding: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  color: ${t('neutral.1200')};
  border: none;
  vertical-align: middle;
  background-color: transparent;
  font-family: 'Share Tech Mono', monospace;
  font-size: 16px;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::selection {
    background-color: ${t('neutral.300')};
    color: ${t('yellow.800')};
  }
`

export const InputWrapper = styled.div`
  background-color: transparent;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 1;
  border-width: 0 1px 1px;
  background-color: ${t('neutral.100')};
  border-radius: 0 0 ${radius} ${radius};
`

export const Hash = styled.span`
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: end;
  color: ${t('neutral.1200')};
`
