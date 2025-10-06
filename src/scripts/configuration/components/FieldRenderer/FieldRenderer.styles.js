import { availableInputTypes } from '@src/constants/inputs.constants'
import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const InputWrapper = styled.div`
  width: fit-content;
  max-width: 30rem;

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

export const FieldWrapper = styled.div`
  margin: ${t('space.900')} 0 0 ${t('space.900')};
  padding-bottom: ${t('space.900')};
  border-bottom: ${t('space.50')} solid ${t('colors.white')};

  &:last-child {
    border-bottom: none;
  }
`

export const FieldTitle = styled.h4`
  margin: ${t('space.400')} 0;
  font-size: ${t('fontSize.50')};
  font-weight: bold;
`

export const FieldDescription = styled.p`
  margin: ${t('space.400')} 0;
  font-size: ${t('fontSize.50')};
  font-style: italic;
`
