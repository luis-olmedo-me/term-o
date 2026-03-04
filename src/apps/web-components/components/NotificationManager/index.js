import { createRootVariablesFromTheme } from '@src/helpers/themes.helpers'
import NotificationManagerHtml from './NotificationManager.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'

class NotificationManager extends HTMLElement {
  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = NotificationManagerHtml

    this.addEventListener('add', this._handleAdd)
    this.addEventListener('theme', this._handleTheme)
  }

  connectedCallback() {
    this.setAttribute('id', 'notifier')

    console.log('💬 ~ notification manager created!')
  }

  get _elements() {
    return {
      wrapper: this._shadow.querySelector('#wrapper'),
      styles: this._shadow.querySelector('#styles')
    }
  }

  _handleAdd(event) {
    console.log('💬 ~ notification added!', event)
  }

  _handleTheme(event) {
    const newTheme = event.detail.theme

    this._elements.styles.innerHTML = createRootVariablesFromTheme(newTheme)
  }
}

if (!customElements.get(webElements.NOTIFICATION_MANAGER)) {
  customElements.define(webElements.NOTIFICATION_MANAGER, NotificationManager)
}
