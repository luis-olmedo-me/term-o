import useStorage from '@src/hooks/useStorage'

import { iconPropType } from '@src/constants/icon.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { themeModes, themeVariants } from '@src/constants/themes.constants'
import { getStrokeOpacityByTheme } from '@src/helpers/icon.helpers'

const Logo = ({ size, className }) => {
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const theme = config.theme
  const isDarkMode = theme.mode === themeModes.DARK
  const isFlatVariant = theme.variant === themeVariants.FLAT
  const isFlatDark = isDarkMode && isFlatVariant

  const strokeOpacityByTheme = getStrokeOpacityByTheme({ theme })

  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.284 10.406a1.99 1.99 0 0 1 0 2.825l-7.232 7.346a1.95 1.95 0 0 1-2.782 0l-.834-.848a1.99 1.99 0 0 1 0-2.825l5.006-5.085-.278-.283a2.36 2.36 0 0 1 0-3.39l.278-.282a2.33 2.33 0 0 1 3.338 0z"
        fill={isFlatDark ? theme.colors.accent : `rgb(from ${theme.colors.accent} r g b / 0.7)`}
        stroke={isDarkMode ? theme.colors.accent : theme.colors.brightBlack}
        stroke-opacity={strokeOpacityByTheme}
        stroke-width="1px"
      />

      <rect
        width="5.232"
        height="5.232"
        x="6.12"
        y="5.7"
        rx="2.5"
        transform="rotate(-45 6.12 5.7)"
        fill={isFlatDark ? theme.colors.white : `rgb(from ${theme.colors.white} r g b / 0.7)`}
        stroke={theme.colors.brightBlack}
        stroke-opacity={strokeOpacityByTheme}
        stroke-width="1px"
      />
    </svg>
  )
}

Logo.propTypes = iconPropType

export default Logo
