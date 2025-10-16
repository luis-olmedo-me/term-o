import { iconSizes } from '@src/constants/icon.constants'
import { theme as t } from '@src/helpers/themes.helpers'
import styled from 'styled-components'
import { buttonVariants } from './Button.constants'

export const ButtonWrapper = styled.button`
  width: fit-content;
  height: fit-content;
  color: ${t('colors.foreground')};
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-size: ${t('fontSize.100')};
  line-height: ${t('lineHeight.300')};
  font-family: ${t('font')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${t('space.300')} ${t('space.300')};
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:hover {
    background-color: ${t('colors.black')};
    color: ${t('colors.brightAccent')};
  }
  &[aria-selected='true']:hover {
    background-color: ${t('colors.accent', 'cc')};
    color: ${t('colors.brightWhite')};
  }

  &[aria-full-width='true'] {
    width: 100%;
  }

  &[aria-selected='true'] {
    color: ${t('colors.accent')};
  }

  &[aria-variant='${buttonVariants.OUTLINED}'] {
    border: ${t('space.50')} solid ${t('colors.white', '40')};
    background-color: ${t('colors.white', '40')};
    border-radius: ${t('radius.200')};
    padding: ${t('space.200')} ${t('space.300')};

    &:focus {
      border: ${t('space.50')} solid ${t('colors.accent')};
    }

    &:hover {
      background-color: ${t('colors.accent', 'cc')};
      color: ${t('colors.brightWhite')};
    }
    &[aria-selected='true']:hover {
      color: ${t('colors.brightAccent')};
    }
  }
  &[aria-variant='${buttonVariants.OUTLINED_DANGER}'] {
    border: ${t('space.50')} solid ${t('colors.red', '40')};
    border-radius: ${t('radius.200')};
    padding: ${t('space.200')} ${t('space.300')};

    &:focus {
      border: ${t('space.50')} solid ${t('colors.red')};
    }

    &:hover {
      background-color: ${t('colors.red')};
      color: ${t('colors.brightWhite')};
    }
    &[aria-selected='true']:hover {
      color: ${t('colors.brightRed')};
    }
  }
`

export const ButtonIconWrapper = styled.span`
  margin: 0 ${t('space.400')} 0 ${t('space.200')};
  height: ${iconSizes.NORMAL}px;

  &:only-child {
    margin: 0;
  }
`
