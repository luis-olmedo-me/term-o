import { InputWrapper } from '@src/components/Input'
import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const SectionWrapper = styled.div`
  margin-bottom: ${t('space.600')};

  &:last-child {
    margin-bottom: ${t('space.800')};
  }
`

export const SectionTitle = styled.h3`
  margin: 0 0 ${t('space.400')} 0;
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
`

export const InputTitle = styled.h4`
  margin: ${t('space.400')} 0;
`

export const Description = styled.p`
  margin: ${t('space.400')} 0;
`
