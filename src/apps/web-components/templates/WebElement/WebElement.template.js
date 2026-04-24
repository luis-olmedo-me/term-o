import { fillTemplate } from '@src/helpers/string.helpers'
import { baseSheet } from './WebElement.constants'
import webElementHtml from './WebElement.raw.html?raw'

import { createCssVariablesFromTheme } from '@src/helpers/themes.helpers'

export class WebElement extends HTMLElement {
  constructor({ html, css, isolated }) {
    super()

    this._root = isolated ? this.attachShadow({ mode: 'closed' }) : this
    this._isolated = isolated
    this._html = html
    this._css = css
    this._props = {}
    this._theme = {}
    this._router = [this._root]

    this.addEventListener('themechange', this._handleThemeChange)
    this.addEventListener('propsloaded', this._handlePropsLoaded)
    this.addEventListener('rootappend', this._handleRootAppend)
  }

  connectedCallback() {
    let styleSheets = this._isolated ? [baseSheet] : []

    this._root.innerHTML = this._isolated
      ? fillTemplate(webElementHtml, { content: this._html })
      : this._html

    if (this._css) {
      const dynamicSheet = new CSSStyleSheet()
      dynamicSheet.replaceSync(this._css)

      styleSheets = styleSheets.concat(dynamicSheet)
    }

    if (styleSheets.length) this._root.adoptedStyleSheets = styleSheets
    this.$onConnectedCallback()
  }

  $get(className) {
    for (const root of this._router) {
      const found = root.querySelector(`.${className}`)

      if (found) return found
    }

    return null
  }

  $prop(name) {
    const value = this._props[name]

    return typeof value !== 'undefined' ? value : null
  }

  $theme() {
    return this._theme
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

  _handleThemeChange(event) {
    const themeElement = this.$get('theme')
    const { theme } = event.detail
    this._theme = theme

    themeElement.innerHTML = createCssVariablesFromTheme(theme, '.web-theme-provider')
  }

  _handlePropsLoaded(event) {
    const { props } = event.detail
    this._props = props

    this.$onPropsLoaded(props)
  }

  _handleRootAppend(event) {
    const { root } = event.detail

    this._router = this._router.concat(root)
  }

  $onPropsLoaded() {}
  $onConnectedCallback() {}
}
