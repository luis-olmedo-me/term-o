import webElementHtml from './WebElement.raw.html?raw'

import { createCssVariablesFromTheme } from '@src/helpers/themes.helpers'

export class WebElement extends HTMLElement {
  constructor({ html, css }) {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = webElementHtml.replace('{content}', html)
    this._css = css

    this.addEventListener('themechange', this.$handleThemeChange)
  }

  connectedCallback() {
    this._elements.styles.innerHTML = this._css
  }

  $get(className) {
    return this._shadow.querySelector(`.${className}`)
  }

  $handleThemeChange(event) {
    const { theme } = event.detail

    this._elements.theme.innerHTML = createCssVariablesFromTheme(theme, '.web-theme-provider')
  }

  $dispatch(name, detail = null) {
    const appearEvent = new CustomEvent(name, { detail })

    this.dispatchEvent(appearEvent)
  }
}
