import { fillTemplate } from '@src/helpers/string.helpers'
import { baseSheet } from './WebElement.constants'
import webElementHtml from './WebElement.raw.html?raw'

import { createCssVariablesFromTheme } from '@src/helpers/themes.helpers'

export class WebElement extends HTMLElement {
  constructor({ html, css, child = false }) {
    super()

    this._root = child ? this : this.attachShadow({ mode: 'closed' })
    this._html = html
    this._css = css
    this._child = child

    this.addEventListener('themechange', this.$handleThemeChange)
  }

  connectedCallback() {
    this._root.innerHTML = this._child
      ? this._html
      : fillTemplate(webElementHtml, { content: this._html })

    if (this._css) {
      const dynamicSheet = new CSSStyleSheet()
      dynamicSheet.replaceSync(this._css)

      this._root.adoptedStyleSheets = [baseSheet, dynamicSheet]
    }

    this.$onConnectedCallback()
  }

  $get(className) {
    return this._root.querySelector(`.${className}`)
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

  $addStyles(element, styles) {
    requestAnimationFrame(() => {
      for (const styleName in styles) {
        element.style.setProperty(styleName, styles[styleName])
      }
    })
  }

  $removeStyles(element, styles) {
    requestAnimationFrame(() => {
      for (const styleName of styles) {
        element.style.removeProperty(styleName)
      }
    })
  }

  $onConnectedCallback() {}
}
