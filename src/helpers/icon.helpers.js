import { themeModes, themeVariants } from '@src/constants/themes.constants'

export const getColorsByTheme = ({ theme }) => {
  const isDarkMode = theme.mode === themeModes.DARK
  const isFlatVariant = theme.variant === themeVariants.FLAT

  if (isFlatVariant && isDarkMode) {
    return {
      primary: {
        fill: theme.colors.accent
      },
      secondary: {
        fill: theme.colors.white
      }
    }
  }

  if (isFlatVariant && !isDarkMode) {
    return {
      primary: {
        fill: `rgb(from ${theme.colors.brightAccent} r g b / 0.7)`,
        stroke: theme.colors.brightAccent,
        strokeOpacity: 0.5,
        strokeWidth: '1px'
      },
      secondary: {
        fill: `rgb(from ${theme.colors.white} r g b / 0.7)`,
        stroke: theme.colors.brightBlack,
        strokeOpacity: 0.2,
        strokeWidth: '1px'
      }
    }
  }

  if (!isFlatVariant && isDarkMode) {
    return {
      primary: {
        fill: `rgb(from ${theme.colors.accent} r g b / 0.5)`,
        stroke: theme.colors.brightAccent,
        strokeOpacity: 0.5,
        strokeWidth: '1px'
      },
      secondary: {
        fill: `rgb(from ${theme.colors.white} r g b / 0.5)`,
        stroke: theme.colors.brightWhite,
        strokeOpacity: 0.5,
        strokeWidth: '1px'
      }
    }
  }

  return {
    primary: {
      fill: `rgb(from ${theme.colors.brightAccent} r g b / 0.7)`,
      stroke: theme.colors.brightBlack,
      strokeOpacity: 1,
      strokeWidth: '1px'
    },
    secondary: {
      fill: `rgb(from ${theme.colors.white} r g b / 0.7)`,
      stroke: theme.colors.brightBlack,
      strokeOpacity: 1,
      strokeWidth: '1px'
    }
  }
}
