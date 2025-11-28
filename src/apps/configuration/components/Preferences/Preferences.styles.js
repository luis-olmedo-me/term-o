import styled from 'styled-components'

import { theme as t } from '@src/helpers/themes.helpers'

export const PreferencesWrapper = styled.div`
  color: ${t('colors.foreground')};
`

export const ContentWrapper = styled.div`
  display: flex;
  gap: ${t('space.600')};
  padding: ${t('space.600')} ${t('space.600')} ${t('space.600')} 0;
  box-sizing: content-box;
`

export const MainContentWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${t('space.600')} * 6 - ${t('fontSize.300')});
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

export const HeaderWrapper = styled.header`
  padding: ${t('space.600')} ${t('space.400')};
  display: flex;
  align-items: center;
  gap: ${t('space.400')};
  border-bottom: ${t('space.50')} solid ${t('colors.brightBlack')};
`

export const HeaderTitle = styled.h1`
  display: inline;
  font-size: ${t('fontSize.300')};
  margin: 0;
`
