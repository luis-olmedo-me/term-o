import { theme as t } from '@src/helpers/theme.helpers'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
`

export const Code = styled.pre`
  padding: 15px;
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
  line-height: 1.2em;

  &::-webkit-scrollbar {
    display: none;
  }
`

const inputStyles = css`
  background-color: ${t('neutral.200')};
  border-radius: ${t('radius.200')};
  font-family: 'Share Tech Mono', monospace;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: 1em;
  border: none;
  display: block;
  caret-color: white;
  color: transparent;
  line-height: 1.2em;

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

export const CodeTextarea = styled.textarea`
  ${inputStyles}
  resize: none;
  min-height: 400px;
`
export const CodeInput = styled.input`
  ${inputStyles}
`
