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
    width: 8px;
    height: 8px;
    background-color: ${t('colors.accent')};
    top: 0.5rem;
    left: 0;
    border-radius: 0 ${t('radius.200')} ${t('radius.200')} 0;
    transition:
      background-color 0.1s ease-in-out,
      color 0.1s ease-in-out,
      left 0.1s ease-in-out;
  }
`
