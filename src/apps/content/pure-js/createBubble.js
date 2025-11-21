import { colorThemeKeys, customColorThemeKeys } from '@src/constants/themes.constants'
import { delay } from '@src/helpers/utils.helpers'

export const createBubble = (message, theme) => {
  let errorHandlers = []
  let timeoutId = null
  let animationTimeoutId = null
  let animationIntervalId = null
  const bubble = document.createElement('div')

  const onError = handler => errorHandlers.push(handler)

  bubble.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      gap: 6px;
    ">
      <svg
        width="14"
        height="14"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M140.87 123.172L189.355 171.861L279.199 81.5806L230.745 32.9088C224.847 27.0005 216.377 24 209 24C203.841 24 194.786 25.4229 187.44 32.816L140.778 79.68C133.417 87.0576 132 96.152 132 101.333C132 108.742 134.988 117.249 140.87 123.172Z"
          fill=${theme.colors[colorThemeKeys.WHITE]}
        />
        <path
          d="M187.425 479.184L140.778 432.32C133.417 424.942 132 415.848 132 410.667C132 403.258 134.988 394.751 140.87 388.828L149.502 380.16L239.351 470.445L230.745 479.091C224.847 484.999 216.377 488 209 488C203.841 488 194.786 486.577 187.425 479.184Z"
          fill=${theme.colors[colorThemeKeys.WHITE]}
        />
        <path
          d="M239.351 470.445L149.502 380.16L273.141 256L189.355 171.861L279.199 81.5806L431.037 234.099C436.581 239.683 440 247.462 440 256C440 264.599 436.381 272.487 431.006 277.901L239.351 470.445Z"
          fill=${theme.colors[customColorThemeKeys.ACCENT]}
        />
      </svg>
      <span>${message}</span>
    </div>
  `

  Object.assign(bubble.style, {
    position: 'fixed',
    bottom: '12px',
    right: '-100%',
    background: theme.colors[colorThemeKeys.BACKGROUND],
    color: theme.colors[customColorThemeKeys.ACCENT],
    border: `solid transparent`,
    borderWidth: '1px 0 1px 1px',
    borderRadius: '10px 0 0 10px',
    padding: '10px 8px',
    fontSize: '13px',
    fontFamily: theme.font,
    cursor: 'pointer',
    zIndex: '999999',
    boxShadow: '0 4px 10px #00000066',
    transition:
      'transform 0.15s ease-in-out, opacity 0.4s ease-in-out, right 1s ease-in-out, color 2s linear, border-color 2s linear, box-shadow 2s linear'
  })
  bubble.onmouseenter = () => (bubble.style.transform = 'scale(1.05)')
  bubble.onmouseleave = () => (bubble.style.transform = 'scale(1)')
  document.body.appendChild(bubble)

  const remove = async () => {
    bubble.style.opacity = '0'
    bubble.style.pointerEvents = 'none'
    bubble.style.right = '-100%'
    await delay(700)
    clearTimeout(timeoutId)
    clearTimeout(animationTimeoutId)
    clearInterval(animationIntervalId)
    bubble.remove()
  }

  const appear = async () => {
    await delay(50)
    bubble.style.right = '0'
    bubble.style.opacity = '1'
    bubble.style.color = theme.colors[customColorThemeKeys.ACCENT]
    bubble.style.borderColor = theme.colors[customColorThemeKeys.ACCENT]
    bubble.style.boxShadow = `0 4px 10px ${theme.colors[customColorThemeKeys.ACCENT]}66`
  }

  const toggleColor = () => {
    const currentColor = bubble.style.borderColor
    const accentColor = theme.colors[customColorThemeKeys.ACCENT]

    bubble.style.borderColor = currentColor === 'transparent' ? accentColor : 'transparent'
    bubble.style.boxShadow = `0 4px 10px ${currentColor === 'transparent' ? `${accentColor}66` : '#00000066'}`
    bubble.style.color =
      currentColor === 'transparent' ? accentColor : theme.colors[colorThemeKeys.FOREGROUND]
  }

  animationTimeoutId = setTimeout(() => {
    animationTimeoutId = null
    bubble.style.transition =
      'transform 0.15s ease-in-out, opacity 0.4s ease-in-out, right 1s ease-in-out, color 1.5s linear, border-color 1.5s linear, box-shadow 1.5s linear'

    animationIntervalId = setInterval(toggleColor, 1000)
  }, 1950)

  timeoutId = setTimeout(() => {
    clearTimeout(animationTimeoutId)
    clearInterval(animationIntervalId)
    bubble.remove()

    errorHandlers.forEach(handler =>
      handler('The bubble closed automatically because no action was taken in time.')
    )
  }, 10000)

  appear()
  return { element: bubble, remove, appear, onError }
}
