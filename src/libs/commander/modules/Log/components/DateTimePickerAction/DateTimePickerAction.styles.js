import { theme as t } from 'src/helpers/theme.helpers'
import styled from 'styled-components'

export const Wrapper = styled.span`
  display: inline-block;
  position: relative;
  overflow: hidden;
  padding: 5px 10px;
  text-align: center;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${t('transparent.100')};
  }

  &:focus,
  &:active,
  &.selected {
    outline: none;
  }

  &&.disabled,
  &&.disabled:hover {
    background-color: ${t('transparent.400')};
  }

  &&.invalid {
    background-color: ${t('red.600')};
    text-decoration: line-through;
  }

  &::selection {
    background-color: ${t('neutral.300')};
    color: ${t('yellow.800')};
  }
`

export const DatePicker = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  box-sizing: border-box;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`

export const Label = styled.span`
  vertical-align: sub;
`
