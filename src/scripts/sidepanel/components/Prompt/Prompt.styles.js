import { InputWrapper } from '@src/components/Input'
import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Line = styled.p`
  margin: 0;
  padding: 0 ${t('space.600')} 0;
  cursor: text;

  &::selection {
    color: ${t('colors.foreground')};
    background-color: ${t('colors.selectionBackground')};
  }
`

export const PromptWrapper = styled.div`
  cursor: text;
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};

  ${InputWrapper} {
    padding: 0 ${t('space.600')} ${t('space.300')};
    gap: ${t('space.200')};
  }
`
