import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const Input = styled.input`
  font-family: ${t('font.primary')};
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: ${t('font-size.50')};
  border: none;
  display: block;
  caret-color: ${t('green.50')};
  line-height: ${t('line-height.300')};
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
  letter-spacing: ${t('space.50')};

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::selection {
    color: ${t('colors.color-selection')};
    background-color: ${t('colors.background-selection')};
  }
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${t('space.400')};
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
  padding: ${t('space.300')} ${t('space.500')};
  cursor: text;

  &[aria-disabled='true'],
  &[aria-disabled='true'] ${Input}:disabled {
    cursor: not-allowed;
  }
`

export const Prefix = styled.span`
  width: 3ch;
`
