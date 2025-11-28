import { webElements } from '@src/constants/web-elements.constants'

export const createBubble = (message, theme) => {
  const bubble = document.createElement(webElements.BUBBLE)

  bubble.setAttribute('message', message)
  bubble.setAttribute('font', theme.font)
  bubble.setAttribute('white', theme.colors.white)
  bubble.setAttribute('accent', theme.colors.accent)
  bubble.setAttribute('background', theme.colors.background)
  bubble.setAttribute('foreground', theme.colors.foreground)
  document.body.appendChild(bubble)

  return bubble
}
