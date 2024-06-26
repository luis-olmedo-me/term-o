import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const LoggerWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${t('space.400')};
  background-color: ${t('grey.900')};
  color: ${t('grey.50')};
  padding: 0 ${t('space.500')};
  margin-top: ${t('line-height.300')};
  cursor: text;

  &::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${t('grey.800')};

    &:active,
    &:hover {
      background-color: ${t('grey.800')};
    }
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: ${t('green.A400')};

    &:active,
    &:hover {
      background-color: ${t('green.A200')};
    }
  }
`
