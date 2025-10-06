import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'
import { inputVariants } from './Input.constants'

export const Postfix = styled.span`
  padding-inline: ${t('space.400')};
  height: -webkit-fill-available;
  display: flex;
  align-items: center;
  border: solid ${t('colors.white', '60')};
  border-width: ${t('space.50')} ${t('space.50')} ${t('space.50')} 0;
  background-color: ${t('colors.white', '20')};
  color: ${t('colors.foreground')};
  border-radius: 0 ${t('space.200')} ${t('space.200')} 0;
  pointer-events: unset;
  transition: border-color 0.1s ease-in-out;
  cursor: help;
`

export const Input = styled.input`
  font-family: ${t('font.primary')};
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: ${t('fontSize.50')};
  border: none;
  display: block;
  caret-color: ${t('colors.cursorColor')};
  line-height: ${t('lineHeight.300')};
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
  letter-spacing: ${t('space.50')};
  cursor: text;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::selection {
    color: ${t('colors.accent')};
    background-color: ${t('colors.selectionBackground')};
  }

  &[type='number'] {
    width: 100px;
  }

  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &.${inputVariants.OUTLINED} {
    border: ${t('space.50')} solid ${t('colors.white', '40')};
    background-color: ${t('colors.white', '40')};
    border-radius: ${t('radius.200')} 0 0 ${t('radius.200')};
    padding-left: ${t('space.300')};
    transition: border-color 0.1s ease-in-out;

    &:last-child {
      border-radius: ${t('radius.200')};
    }

    &:focus {
      border: ${t('space.50')} solid ${t('colors.accent')};
    }

    &:hover {
      background-color: ${t('colors.accent')};
      color: ${({ selected }) => (selected ? t('colors.brightAccent') : t('colors.brightWhite'))};

      &,
      & + ${Postfix} {
        border-color: ${t('colors.accent')};
      }
    }
  }
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};

  &[aria-fit-content='true'] {
    width: fit-content;
  }

  &[aria-disabled='true'],
  &[aria-disabled='true'] ${Input}:disabled {
    cursor: text;
  }
`

export const Prefix = styled.span`
  &::selection {
    color: ${t('colors.accent')};
    background-color: ${t('colors.selectionBackground')};
  }
`
