import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'
import { Input, InputWrapper as InputContainer } from '../Input/Input.styles'

export const SectionTitle = styled.h3`
  margin: ${t('space.400')} 0;
`

export const InputWrapper = styled.div`
  padding: 0 0 0 ${t('space.600')};

  ${InputContainer} {
    padding: 0;
  }

  ${Input} {
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
