import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const LoggerWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${t('space.400')};
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
  padding: 0 ${t('space.600')};
  margin-right: ${t('space.600')};
  cursor: text;
`
