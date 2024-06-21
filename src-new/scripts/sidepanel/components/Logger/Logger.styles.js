import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const LoggerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${t('grey.900')};
  color: ${t('grey.50')};
  padding: ${t('space.400')} ${t('space.500')} 0;
  cursor: text;
`
