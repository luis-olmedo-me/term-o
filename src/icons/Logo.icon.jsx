import useStorage from '@src/hooks/useStorage'

import { iconPropType } from '@src/constants/icon.constants'
import { storageKeys } from '@src/constants/storage.constants'

const Logo = ({ size, className }) => {
  const [config] = useStorage({ key: storageKeys.CONFIG })
  const theme = config.theme

  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={0.5}
        d="M132 99.3333C132 106.742 134.988 115.249 140.87 121.172L273.141 254L140.87 386.828C134.988 392.751 132 401.258 132 408.667C132 413.848 133.417 422.942 140.778 430.32L187.425 477.184C194.786 484.577 203.841 486 209 486C216.377 486 224.847 482.999 230.745 477.091L431.006 275.901C436.381 270.487 440 262.599 440 254C440 245.462 436.581 237.683 431.037 232.099L230.745 30.9088C224.847 25.0005 216.377 22 209 22C203.841 22 194.786 23.4229 187.44 30.816L140.778 77.68C133.417 85.0576 132 94.152 132 99.3333Z"
        fill={theme.isDarkMode ? theme.colors.accent : theme.colors.brightAccent}
      />

      <path
        d="M132 99.3333C132 106.742 134.988 115.249 140.87 121.172L273.141 254L140.87 386.828C134.988 392.751 132 401.258 132 408.667C132 413.848 133.417 422.942 140.778 430.32L187.425 477.184C194.786 484.577 203.841 486 209 486C216.377 486 224.847 482.999 230.745 477.091L431.006 275.901C436.381 270.487 440 262.599 440 254C440 245.462 436.581 237.683 431.037 232.099L230.745 30.9088C224.847 25.0005 216.377 22 209 22C203.841 22 194.786 23.4229 187.44 30.816L140.778 77.68C133.417 85.0576 132 94.152 132 99.3333Z"
        stroke={theme.isDarkMode ? theme.colors.accent : theme.colors.brightBlack}
        stroke-width="25px"
      />
    </svg>
  )
}

Logo.propTypes = iconPropType

export default Logo
