import { InputWrapper } from '@src/components/Input'
import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Line = styled.p`
  margin: 0;
  cursor: text;
`

export const PromptWrapper = styled.div`
  cursor: text;
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
  padding: 0 ${t('space.600')};
  box-shadow: 0 0 ${t('space.200')} ${t('space.100')} ${t('colors.background')};
  z-index: 1;

  ${InputWrapper} {
    padding: 0 0 ${t('space.300')};
    gap: ${t('space.200')};
  }
`
