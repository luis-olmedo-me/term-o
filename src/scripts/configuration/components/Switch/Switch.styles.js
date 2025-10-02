import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const SimulatedSwitch = styled.div`
  height: 100px;
  width: 100px;
  background-color: red;

  &.selected {
    background-color: green;
  }
`

export const Input = styled.input`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::selection {
    color: ${t('colors.green')};
    background-color: ${t('colors.selectionBackground')};
  }
`

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${t('space.400')};
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
  padding: ${t('space.300')} ${t('space.600')};
  cursor: text;
  position: relative;

  &[aria-disabled='true'],
  &[aria-disabled='true'] ${Input}:disabled {
    cursor: text;
  }

  &:has(${Input}[type="checkbox"]) {
    width: fit-content;
  }

  input[type='checkbox'] {
    margin: 0;
    accent-color: ${t('colors.brightGreen')};
  }
`

export const Prefix = styled.span`
  &::selection {
    color: ${t('colors.green')};
    background-color: ${t('colors.selectionBackground')};
  }
`
