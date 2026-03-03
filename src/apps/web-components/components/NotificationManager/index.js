import NotificationManagerCss from './NotificationManager.raw.css?raw'
import NotificationManagerHtml from './NotificationManager.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'
import { applyCssVariablesFromTheme } from '@web-components/helpers/props.helpers'

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

  get _elements() {
    return {
      wrapper: this._shadow.querySelector('#wrapper'),
      styles: this._shadow.querySelector('#styles')
    }
  }

  _handleTheme(event) {
    const newTheme = event.detail

    this._elements.styles.innerHTML = applyCssVariablesFromTheme(NotificationManagerCss, newTheme)
  }

  async _handleNewTheme(event) {
    console.log('💬 ~ New theme supplied:', event)
  }
}

if (!customElements.get(webElements.NOTIFICATION_MANAGER)) {
  customElements.define(webElements.NOTIFICATION_MANAGER, NotificationManager)
}
