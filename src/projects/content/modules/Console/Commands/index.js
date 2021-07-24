import { domGet } from './dom-get.command'
import { css } from './css.command'
import { theme } from './constants/theme.constants'

const commands = {
  ...domGet,
  ...css
}

const keywords = Object.keys(commands)

export { commands, keywords, theme }
