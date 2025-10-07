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
  padding: 0 ${t('space.600')};

  &::after {
    content: '';
    position: absolute;
    top: 0.5rem;
    transition: background-color 0.1s ease-in-out;
  }

  &[aria-execution-context=${executionContexts.BACKGROUND}] {
    opacity: 0.7;
  }

  &[aria-status=${statuses.DONE}]::after {
    background-color: ${t('colors.green')};
  }
  &[aria-status=${statuses.ERROR}]::after {
    background-color: ${t('colors.red')};
  }
  &[aria-status=${statuses.EXECUTING}]::after {
    background-color: ${t('colors.white')};
  }

  &[aria-variant=${'half-dot'}]::after {
    border-radius: 0 ${t('radius.200')} ${t('radius.200')} 0;
    left: 0;
    width: ${t('space.200')};
    height: ${t('space.300')};
  }
  &[aria-variant=${'dot'}]::after {
    border-radius: ${t('radius.200')};
    left: ${t('space.200')};
    width: ${t('space.300')};
    height: ${t('space.300')};
  }
  &[aria-variant=${'none'}]::after {
    display: none;
  }
`
