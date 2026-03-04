import { createCssVariablesFromTheme } from '@src/helpers/themes.helpers'
import NotificationManagerCss from './NotificationManager.raw.css?raw'
import NotificationManagerHtml from './NotificationManager.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'
import { createWebElement } from '@src/helpers/web-components.helpers'

class NotificationManager extends HTMLElement {
  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = NotificationManagerHtml
    this._elements.styles.innerHTML = NotificationManagerCss

    this.addEventListener('add', this._handleAdd)
    this.addEventListener('theme', this._handleTheme)
  }

  connectedCallback() {
    this.setAttribute('id', 'notifier')
  }

  get _elements() {
    return {
      wrapper: this._shadow.querySelector('#wrapper'),
      styles: this._shadow.querySelector('#styles'),
      theme: this._shadow.querySelector('#theme')
    }
  }

  _handleAdd(event) {
    const initEvent = new CustomEvent('init', { detail: event.detail })
    const notificationItem = createWebElement(
      webElements.NOTIFICATION_ITEM,
      {},
      this._elements.wrapper
    )

    notificationItem.dispatchEvent(initEvent)
  }

  _handleTheme(event) {
    const { theme } = event.detail

    this._elements.theme.innerHTML = createCssVariablesFromTheme(theme, '#web-theme-provider')
  }
}

if (!customElements.get(webElements.NOTIFICATION_MANAGER)) {
  customElements.define(webElements.NOTIFICATION_MANAGER, NotificationManager)
}
