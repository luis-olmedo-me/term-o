import { defaultConfigSections } from '@src/constants/config.constants'

export const sidePanelOptions = defaultConfigSections.map(section => ({
  id: section.id,
  name: section.name,
  Icon: section.Icon
}))

export const rotationValues = [210, 30]
export const backgroundLogo = `
  <svg
    opacity="{opacity}"
    width="512"
    height="512"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="6"
          flood-color="black"
          flood-opacity="0.5"
        />
      </filter>
    </defs>

    <g transform="rotate({rotation} 256 256)" filter="url(#shadow)">
      <path
        d="M140.87 121.172L189.355 169.861L279.199 79.5806L230.745 30.9088C224.847 25.0005 216.377 22 209 22C203.841 22 194.786 23.4229 187.44 30.816L140.778 77.68C133.417 85.0576 132 94.152 132 99.3333C132 106.742 134.988 115.249 140.87 121.172Z"
        fill="{brightWhite}"
      />
      <path
        d="M187.425 477.184L140.778 430.32C133.417 422.942 132 413.848 132 408.667C132 401.258 134.988 392.751 140.87 386.828L149.502 378.16L239.351 468.445L230.745 477.091C224.847 482.999 216.377 486 209 486C203.841 486 194.786 484.577 187.425 477.184Z"
        fill="{brightWhite}"
      />
      <path
        d="M239.351 468.445L149.502 378.16L273.141 254L189.355 169.861L279.199 79.5806L431.037 232.099C436.581 237.683 440 245.462 440 254C440 262.599 436.381 270.487 431.006 275.901L239.351 468.445Z"
        fill="{brightAccent}"
      />
    </g>
  </svg>
`
