import { InputWrapper } from '@src/components/Input'
import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const PreferencesWrapper = styled.div`
  color: ${t('colors.foreground')};
  display: flex;
  gap: ${t('space.600')};
  padding: ${t('space.600')};
  box-sizing: content-box;
`

export const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${t('space.600')} * 2);
  overflow: hidden scroll;
  padding-right: ${t('space.600')};
  box-sizing: content-box;
`

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
  margin: ${t('space.900')} 0 0 ${t('space.900')};
  padding-bottom: ${t('space.900')};
  border-bottom: ${t('space.50')} solid ${t('colors.brightBlack')};

  ${InputWrapper} {
    padding: 0;
    max-width: 500px;
  }

  input[type='text'],
  input[type='number'] {
    border: 1px solid ${t('colors.brightBlack')};
    background-color: ${t('colors.brightBlack')};
    border-radius: ${t('radius.200')};
    padding-left: 5px;
    transition: border-color 0.1s ease-in-out;

    &:focus {
      border: 1px solid ${t('colors.green')};
    }
  }
`

export const InputTitle = styled.h4`
  margin: ${t('space.400')} 0;
`

export const Description = styled.p`
  margin: ${t('space.400')} 0;
`
