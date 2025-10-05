import { colorThemeKeys } from '@src/constants/themes.constants'
import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Dot = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  display: inline-block;
  border-radius: ${t('radius.200')};
  border: ${t('space.50')} solid currentColor;

  &.${colorThemeKeys.BLUE} {
    background-color: ${t('colors.blue')};
  }
  &.${colorThemeKeys.CYAN} {
    background-color: ${t('colors.cyan')};
  }
  &.${colorThemeKeys.GREEN} {
    background-color: ${t('colors.green')};
  }
  &.${colorThemeKeys.PURPLE} {
    background-color: ${t('colors.purple')};
  }
  &.${colorThemeKeys.RED} {
    background-color: ${t('colors.red')};
  }
  &.${colorThemeKeys.YELLOW} {
    background-color: ${t('colors.yellow')};
  }
`
