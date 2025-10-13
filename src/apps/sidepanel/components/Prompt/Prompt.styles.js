import { InputWrapper, RealInput } from '@src/components/Input'
import { statusIndicators } from '@src/constants/config.constants'
import { theme as t } from '@src/helpers/themes.helpers'
import styled from 'styled-components'

export const Line = styled.p`
  margin: 0;
  cursor: text;
`

export const PromptWrapper = styled.div`
  cursor: text;
  background-color: transparent;
  color: ${t('colors.foreground')};
  padding: 0 ${t('space.600')} 0 ${t('space.800')};
  box-shadow: 0 0 ${t('space.200')} ${t('space.100')} ${t('colors.background')};
  transition: box-shadow 0.2s ease-in-out;
  z-index: 1;

  &[aria-indicator=${statusIndicators.HALF_DOT}] {
    padding: 0 ${t('space.600')};
  }

  &[aria-loading='true'] ${InputWrapper}, &[aria-loading='true'] ${RealInput} {
    color: ${t('colors.foreground', '60')};
  }

  ${InputWrapper} {
    padding: 0 0 ${t('space.300')};
    gap: ${t('space.200')};
  }
`
