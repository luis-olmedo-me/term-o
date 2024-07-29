import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'
import { InputWrapper } from '../Input/Input.styles'

export const SectionWrapper = styled.div`
  margin-bottom: ${t('space.600')};

  &:last-child {
    margin-bottom: 0;
  }
`

export const SectionTitle = styled.h3`
  margin: ${t('space.400')} 0;
`

export const InputsWrapper = styled.div`
  margin: ${t('space.600')} 0 0 ${t('space.600')};

  ${InputWrapper} {
    padding: 0;
  }

  input[type='text'],
  input[type='number'] {
    border: 1px solid ${t('colors.brightBlack')};
    border-radius: ${t('radius.200')};
    padding-left: 5px;
  }

  input[type='checkbox'] {
    margin: 0;
  }
`

export const InputTitle = styled.h4`
  margin: ${t('space.400')} 0;
`

export const Description = styled.p`
  margin: ${t('space.400')} 0;
`
