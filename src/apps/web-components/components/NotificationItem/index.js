import NotificationItemCss from './NotificationItem.raw.css?raw'
import NotificationItemHtml from './NotificationItem.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'

class NotificationItem extends HTMLElement {
  constructor() {
    super()

    this.innerHTML = NotificationItemHtml
    this._elements.styles.innerHTML = NotificationItemCss
  }

  connectedCallback() {
    console.log('💬 ~ notification item created!')
  }

  get _elements() {
    return {
      wrapper: this._shadow.querySelector('#wrapper'),
      styles: this._shadow.querySelector('#styles')
    }
  }
}

if (!customElements.get(webElements.NOTIFICATION_ITEM)) {
  customElements.define(webElements.NOTIFICATION_ITEM, NotificationItem)
}
