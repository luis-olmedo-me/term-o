import { theme as t } from '@src/helpers/theme.helpers'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  background-color: ${t('neutral.200')};
  border-radius: ${t('radius.200')};
  padding: 15px;
  box-sizing: border-box;

  ${props => props.inputStyles}
`

export const Code = styled.pre`
  font-family: 'Share Tech Mono', monospace;
  pointer-events: none;
  position: absolute;
  padding: 0;
  inset: 15px;
  margin: 0;
  font-size: 1em;
  overflow: scroll;
  display: block;
  line-height: 1.2em;

  & * {
    font-family: 'Share Tech Mono', monospace;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const inputStyles = css`
  font-family: 'Share Tech Mono', monospace;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: 1em;
  border: none;
  display: block;
  caret-color: ${t('neutral.1200')};
  background-color: transparent;
  color: transparent;
  line-height: 1.2em;
  padding: 0;

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
