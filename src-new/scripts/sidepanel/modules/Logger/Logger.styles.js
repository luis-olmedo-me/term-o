import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const LoggerWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${t('space.400')};
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
  padding: 0 ${t('space.500')};
  margin-top: ${t('space.500')};
  margin-right: ${t('space.500')};
  cursor: text;

  &::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${t('colors.black')};
    border-radius: 3px;
    cursor: pointer;

    &:active,
    &:hover {
      background-color: ${t('colors.black')};
    }
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${t('colors.bright-black')};
    cursor: pointer;

    &:active,
    &:hover {
      background-color: ${t('colors.color-selection')};
    }
  }
`
