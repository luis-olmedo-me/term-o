import { theme as t } from '@src/helpers/theme.helpers'
import styled, { css } from 'styled-components'

const radius = t('radius.100')

export const EditorWrapper = styled.div`
  display: inline-block;
  width: calc(100% - 25px);
  padding: 15px 0 15px 15px;
  box-sizing: border-box;
  color: ${t('neutral.1200')};
`

export const inputStyles = css`
  background-color: ${t('neutral.100')};
  width: calc(100% - 25px);
  border-radius: 0 0 ${radius} 0;
  box-sizing: content-box;
  display: inline-block;

  & > pre,
  & > input {
    padding: 0;
  }
`

export const Input = styled.input`
  padding: 15px;
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
  width: 25px;
  display: inline-block;
  vertical-align: middle;
  text-align: end;
  color: ${t('neutral.1200')};
`
