import styled from 'styled-components'
import { theme as t } from '../../../../theme/theme.helpers'

export const LoggerWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${t('space.400')};
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
  padding: 0 ${t('space.600')};
  margin-top: ${t('space.600')};
  margin-right: ${t('space.600')};
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
    background-color: ${t('colors.brightBlack')};
    cursor: pointer;

    &:active,
    &:hover {
      background-color: ${t('colors.brightGreen')};
    }
  }
`
