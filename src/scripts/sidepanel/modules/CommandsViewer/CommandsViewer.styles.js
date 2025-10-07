import { statusIndicators } from '@src/constants/config.constants'
import { executionContexts } from '@src/libs/command-parser'
import { statuses } from '@src/libs/command-parser/sub-services/command'
import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${t('space.400')};
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
  margin-right: ${t('space.500')};
  cursor: text;
  word-break: break-all;
`

export const Command = styled.div`
  position: relative;
  padding: 0 ${t('space.600')} 0 ${t('space.800')};

  &::after {
    content: '';
    position: absolute;
    top: 0.5rem;
    transition: background-color 0.1s ease-in-out;
  }

  &[aria-execution-context=${executionContexts.SIDEPANEL}],
  &[aria-execution-context=${executionContexts.BACKGROUND}] {
    &::before {
      content: '';
      position: absolute;
      top: 0.5rem;
      transition: background-color 0.1s ease-in-out;
      background-color: ${t('colors.brightBlack', '30')};
      border-radius: ${t('radius.200')};
      left: ${t('space.300')};
      width: ${t('space.200')};
      height: calc(100% - 1rem);
    }

    &[aria-variant=${statusIndicators.HALF_DOT}]::before {
      border-radius: 0 ${t('radius.200')} ${t('radius.200')} 0;
      left: 0;
    }
  }
  &[aria-execution-context=${executionContexts.BACKGROUND}]::before {
    opacity: 0.4;
  }

  &[aria-status=${statuses.DONE}]::after {
    color: ${t('colors.green')};
    background-color: ${t('colors.green')};
  }
  &[aria-status=${statuses.ERROR}]::after {
    color: ${t('colors.red')};
    background-color: ${t('colors.red')};
  }
  &[aria-status=${statuses.EXECUTING}]::after {
    color: ${t('colors.white')};
    background-color: ${t('colors.white')};
  }

  &[aria-variant=${statusIndicators.NONE}]::after {
    display: none;
  }
  &[aria-variant=${statusIndicators.DOT}]::after {
    border-radius: ${t('radius.200')};
    left: ${t('space.300')};
    height: ${t('space.200')};
    width: ${t('space.200')};
  }
  &[aria-variant=${statusIndicators.HALF_DOT}]::after {
    border-radius: 0 ${t('radius.200')} ${t('radius.200')} 0;
    left: 0;
    width: ${t('space.250')};
    height: ${t('space.200')};
  }
  &[aria-variant=${statusIndicators.HALF_DOT}][aria-light='true']::after,
  &[aria-variant=${statusIndicators.DOT}][aria-light='true']::after {
    box-shadow: 0 0 ${t('space.200')} ${t('space.100')} currentColor;
  }
`
