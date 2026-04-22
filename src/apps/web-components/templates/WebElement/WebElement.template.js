import { baseSheet } from './WebElement.constants'
import webElementHtml from './WebElement.raw.html?raw'

import { createCssVariablesFromTheme } from '@src/helpers/themes.helpers'

export class WebElement extends HTMLElement {
  constructor({ html, css }) {
    super()

    this._root = this.attachShadow({ mode: 'closed' })
    this._root.innerHTML = webElementHtml.replace('{content}', html)

    const dynamicSheet = new CSSStyleSheet()

    dynamicSheet.replaceSync(css)

    this._root.adoptedStyleSheets = [baseSheet, dynamicSheet]

    this.addEventListener('themechange', this.$handleThemeChange)
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
}
