import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: ${t('neutral.200')};
  border-radius: ${t('radius.200')};
  position: relative;
`

export const Code = styled.pre`
  padding: 10px 15px;
  pointer-events: none;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  font-size: 1em;
  overflow: scroll;
  display: block;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const CodeInput = styled.textarea`
  padding: 10px 15px;
  width: 100%;
  min-height: 400px;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: 1em;
  border: none;
  background-color: transparent;
  display: block;
  caret-color: white;
  color: transparent;
  resize: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::selection {
    color: transparent;
    background-color: ${t('transparent.450')};
  }
`
