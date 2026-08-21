import useStorage from '@src/hooks/useStorage'

import { iconPropType } from '@src/constants/icon.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { getColorsByTheme } from '@src/helpers/icon.helpers'

const Logo = ({ size, className, monocromatic }) => {
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const theme = config.theme
  const colors = getColorsByTheme({ theme })

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
        fill={monocromatic ? colors.secondary.fill : colors.primary.fill}
        stroke={colors.primary.stroke}
        stroke-opacity={colors.primary.strokeOpacity}
        stroke-width={colors.primary.strokeWidth}
      />

      <rect
        width="5.232"
        height="5.232"
        x="6.12"
        y="5.7"
        rx="2.5"
        transform="rotate(-45 6.12 5.7)"
        fill={colors.secondary.fill}
        stroke={colors.secondary.stroke}
        stroke-opacity={colors.secondary.strokeOpacity}
        stroke-width={colors.secondary.strokeWidth}
      />
    </svg>
  )
}

Logo.propTypes = { ...iconPropType, monocromatic: Boolean }

export default Logo
