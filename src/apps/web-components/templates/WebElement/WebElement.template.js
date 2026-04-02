import webElementCss from './WebElement.raw.css?raw'
import webElementHtml from './WebElement.raw.html?raw'

import { createCssVariablesFromTheme } from '@src/helpers/themes.helpers'

export class WebElement extends HTMLElement {
  constructor({ html, css }) {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = webElementHtml.replace('{content}', html)
    this.$get('styles').innerHTML = `${webElementCss}\n${css}`

    this.addEventListener('themechange', this.$handleThemeChange)
  }

  $get(className) {
    return this._shadow.querySelector(`.${className}`)
  }

  $handleThemeChange(event) {
    const themeElement = this.$get('theme')
    const { theme } = event.detail

    themeElement.innerHTML = createCssVariablesFromTheme(theme, '.web-theme-provider')
  }

  $dispatch(name, detail = null) {
    const customEvent = new CustomEvent(name, { detail })

    this.dispatchEvent(customEvent)
  }
}
