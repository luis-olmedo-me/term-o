import { themeModes, themeVariants } from '@src/constants/themes.constants'

export const getStrokeOpacityByTheme = ({ theme }) => {
  const isDarkMode = theme.mode === themeModes.DARK
  const isFlatVariant = theme.variant === themeVariants.FLAT

  if (isFlatVariant && isDarkMode) return 0
  if (isFlatVariant && !isDarkMode) return 0.1
  return 0.5
}
