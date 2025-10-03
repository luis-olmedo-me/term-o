import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'
import { buttonVariants } from './Button.constants'

export const ButtonWrapper = styled.button`
  width: fit-content;
  height: fit-content;
  color: ${t('colors.foreground')};
  background-color: ${t('colors.background')};
  border: none;
  font-weight: bold;
  font-size: ${t('fontSize.100')};
  line-height: ${t('lineHeight.300')};
  font-family: ${t('font.primary')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${t('space.300')} ${t('space.300')};
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;

  &[aria-variant='${buttonVariants.OUTLINED}'] {
    border: ${t('space.50')} solid ${t('colors.white', '40')};
    background-color: ${t('colors.white', '40')};
    border-radius: ${t('radius.200')};
    padding: ${t('space.200')} ${t('space.300')};

    &:focus {
      border: ${t('space.50')} solid ${t('colors.green')};
    }

    &:hover {
      background-color: ${t('colors.green')};
      color: ${({ selected }) => (selected ? t('colors.brightGreen') : t('colors.brightWhite'))};
    }
  }
  &[aria-variant='${buttonVariants.OUTLINED_DANGER}'] {
    border: ${t('space.50')} solid ${t('colors.red', '40')};
    background-color: ${t('colors.red', '40')};
    border-radius: ${t('radius.200')};
    padding: ${t('space.200')} ${t('space.300')};

    &:focus {
      border: ${t('space.50')} solid ${t('colors.red')};
    }

    &:hover {
      background-color: ${t('colors.red')};
      color: ${({ selected }) => (selected ? t('colors.brightRed') : t('colors.brightWhite'))};
    }
  }

  &[aria-full-width='true'] {
    width: 100%;
  }
  &[aria-selected='true'] {
    color: ${t('colors.green')};
  }

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:hover {
    background-color: ${({ selected }) => (selected ? t('colors.green') : t('colors.black'))};
    color: ${({ selected }) => (selected ? t('colors.brightWhite') : t('colors.brightGreen'))};
  }
`
