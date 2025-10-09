import * as React from 'preact'
import { useTheme } from 'styled-components'

import { iconPropType } from '@src/constants/icon.constants'

const Logo = ({ size }) => {
  const theme = useTheme()

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1228_14)">
        <path
          d="M140.87 123.172L189.355 171.861L279.199 81.5806L230.745 32.9088C224.847 27.0005 216.377 24 209 24C203.841 24 194.786 25.4229 187.44 32.816L140.778 79.68C133.417 87.0576 132 96.152 132 101.333C132 108.742 134.988 117.249 140.87 123.172Z"
          fill={theme.colors.white}
        />
        <path
          d="M187.425 479.184L140.778 432.32C133.417 424.942 132 415.848 132 410.667C132 403.258 134.988 394.751 140.87 388.828L149.502 380.16L239.351 470.445L230.745 479.091C224.847 484.999 216.377 488 209 488C203.841 488 194.786 486.577 187.425 479.184Z"
          fill={theme.colors.white}
        />
        <path
          d="M239.351 470.445L149.502 380.16L273.141 256L189.355 171.861L279.199 81.5806L431.037 234.099C436.581 239.683 440 247.462 440 256C440 264.599 436.381 272.487 431.006 277.901L239.351 470.445Z"
          fill={theme.colors.accent}
        />
      </g>
      <rect
        x="227.555"
        y="81.6208"
        width="16.4103"
        height="119.84"
        rx="6"
        transform="rotate(-45 227.555 81.6208)"
        fill={theme.colors.brightWhite}
      />
      <defs>
        <filter
          id="filter0_d_1228_14"
          x="102"
          y="24"
          width="338"
          height="464"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-30" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1228_14" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1228_14"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

Logo.propTypes = iconPropType

export default Logo
