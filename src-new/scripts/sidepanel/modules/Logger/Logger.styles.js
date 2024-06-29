import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const LoggerWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${t('space.400')};
  background-color: ${t('colors.background')};
  color: ${t('grey.50')};
  padding: 0 ${t('space.500')};
  margin-top: ${t('space.500')};
  margin-right: ${t('space.500')};
  cursor: text;

  &::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${t('grey.800')};
    border-radius: 3px;

    &:active,
    &:hover {
      background-color: ${t('grey.800')};
    }
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${t('grey.600')};

    &:active,
    &:hover {
      background-color: ${t('green.A200')};
    }
  }
`
