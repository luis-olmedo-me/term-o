import NotificationItemHtml from './NotificationItem.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'

class NotificationItem extends HTMLElement {
  constructor() {
    super()

    this.innerHTML = NotificationItemHtml

    this.addEventListener('create', this._handleCreate)
  }

  connectedCallback() {
    console.log('💬 ~ notification item created!')
  }

  get _elements() {
    return {
      styles: this.querySelector('#styles'),
      wrapper: this.querySelector('#wrapper'),
      title: this.querySelector('#title'),
      message: this.querySelector('#message')
    }
  }

  _handleCreate(event) {
    const { title, message } = event.detail

    this.querySelector('#title').innerHTML = title
    this.querySelector('#message').innerHTML = message
  }
}

if (!customElements.get(webElements.NOTIFICATION_ITEM)) {
  customElements.define(webElements.NOTIFICATION_ITEM, NotificationItem)
}
