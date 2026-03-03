import NotificationManagerHtml from './NotificationManager.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'

class NotificationManager extends HTMLElement {
  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = NotificationManagerHtml

    this.addEventListener('theme', this._handleTheme)
    this.addEventListener('new-theme', this._handleNewTheme)
  }

  connectedCallback() {
    console.log('💬 ~ notification manager created!')
  }

  _handleTheme(event) {
    console.log('💬 ~ Theme supplied:', event)
  }

  async _handleNewTheme(event) {
    console.log('💬 ~ New theme supplied:', event)
  }
}

if (!customElements.get(webElements.NOTIFICATION_MANAGER)) {
  customElements.define(webElements.NOTIFICATION_MANAGER, NotificationManager)
}
