import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Line = styled.p`
  margin: 0;
  padding: ${t('space.300')} ${t('space.600')} 0;
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
`
