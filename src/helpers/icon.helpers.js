import { themeModes, themeVariants } from '@src/constants/themes.constants'

export const getColorsByTheme = ({ theme }) => {
  const isDarkMode = theme.mode === themeModes.DARK
  const isFlatVariant = theme.variant === themeVariants.FLAT
  const isFlatDark = isDarkMode && isFlatVariant

  if (isFlatVariant && isDarkMode) {
    return {
      primary: {
        fill: isFlatDark ? theme.colors.accent : `rgb(from ${theme.colors.accent} r g b / 0.7)`
      },
      secondary: {
        fill: isFlatDark ? theme.colors.white : `rgb(from ${theme.colors.white} r g b / 0.7)`
      }
    }
  }

  if (isFlatVariant && !isDarkMode) {
    return {
      primary: {
        fill: isFlatDark ? theme.colors.accent : `rgb(from ${theme.colors.accent} r g b / 0.7)`,
        stroke: isDarkMode ? theme.colors.accent : theme.colors.brightBlack,
        strokeOpacity: 0.1,
        strokeWidth: '1px'
      },
      secondary: {
        fill: isFlatDark ? theme.colors.white : `rgb(from ${theme.colors.white} r g b / 0.7)`,
        stroke: theme.colors.brightBlack,
        strokeOpacity: 0.1,
        strokeWidth: '1px'
      }
    }
  }

  return {
    primary: {
      fill: isFlatDark ? theme.colors.accent : `rgb(from ${theme.colors.accent} r g b / 0.7)`,
      stroke: isDarkMode ? theme.colors.accent : theme.colors.brightBlack,
      strokeOpacity: 0.5,
      strokeWidth: '1px'
    },
    secondary: {
      fill: isFlatDark ? theme.colors.white : `rgb(from ${theme.colors.white} r g b / 0.7)`,
      stroke: theme.colors.brightBlack,
      strokeOpacity: 0.5,
      strokeWidth: '1px'
    }
  }
}
