import { InputWrapper } from '@src/components/Input'
import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const PreferencesWrapper = styled.div`
  color: ${t('colors.foreground')};
  display: flex;
  gap: ${t('space.600')};
  padding: ${t('space.600')} ${t('space.600')} ${t('space.600')} 0;
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
  margin-top: ${t('space.600')};
`

export const SectionTitle = styled.h3`
  margin: 0 0 ${t('space.400')} 0;
  font-size: ${t('fontSize.200')};
`

export const SectionDescription = styled.p`
  font-size: ${t('fontSize.50')};
`

export const ConfigInputWrapper = styled.div`
  margin: ${t('space.900')} 0 0 ${t('space.900')};
  padding-bottom: ${t('space.900')};
  border-bottom: ${t('space.50')} solid ${t('colors.white')};

  ${InputWrapper} {
    max-width: 500px;
    width: fit-content;
  }

  &:last-child {
    border-bottom: none;
  }
`

export const ConfigInputTitle = styled.h4`
  margin: ${t('space.400')} 0;
  font-size: ${t('fontSize.50')};
  font-weight: bold;
`

export const ConfigInputDescription = styled.p`
  margin: ${t('space.400')} 0;
  font-size: ${t('fontSize.50')};
  font-style: italic;
`
