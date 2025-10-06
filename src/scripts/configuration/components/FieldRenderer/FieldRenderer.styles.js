import { availableInputTypes } from '@src/constants/inputs.constants'
import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const FieldWrapper = styled.div`
  width: fit-content;

  &[aria-type='${availableInputTypes.TEXT_AREA}'],
  &[aria-type='${availableInputTypes.STRING}'] {
    width: 100%;
  }

  &[aria-error='true'] {
    outline: ${t('space.150')} dashed ${t('colors.red')};
    border-radius: ${t('space.200')};
  }
`

export const ErrorMessage = styled.span`
  margin-top: ${t('space.400')};
  display: block;
  color: ${t('colors.red')};
`
