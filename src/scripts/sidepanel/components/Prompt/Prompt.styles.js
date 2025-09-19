import { theme as t } from '@src/libs/themer'
import styled, { keyframes } from 'styled-components'
import { InputWrapper } from '../Input/Input.styles'

const slide = keyframes`
  from {
    left: 0;
    opacity: 0;
  }

  50%{
    opacity: 1;
  }

  to {
    left: 95%;
    opacity: 0;
  }
`

export const Line = styled.p`
  margin: 0;
  padding: 0 ${t('space.600')} 0;
  cursor: text;

  &::selection {
    color: ${t('colors.brightGreen')};
    background-color: ${t('colors.selectionBackground')};
  }
`

export const PromptWrapper = styled.div`
  cursor: text;
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};

  ${InputWrapper} {
    padding: 0 ${t('space.600')} ${t('space.300')};
  }

  &.loading {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      animation: ${slide} 1s linear infinite;
      width: 5%;
      height: ${t('space.200')};
      background: ${t('colors.blue')};
      bottom: 0;
      left: 0;
      border-radius: ${t('radius.100')} ${t('radius.100')} 0 0;
    }
  }
`
