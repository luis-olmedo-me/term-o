import { buildHtmlTextContent } from './NotificationItem.helpers'
import NotificationItemHtml from './NotificationItem.raw.html?raw'

import { embedWebElements } from '@src/constants/web-elements.constants'

class NotificationItem extends HTMLElement {
  constructor() {
    super()

    this.addEventListener('init', this.init)
  }

  connectedCallback() {
    this.innerHTML = NotificationItemHtml
  }

  get _elements() {
    return {
      styles: this.querySelector('.styles'),
      wrapper: this.querySelector('.wrapper'),
      title: this.querySelector('.title'),
      message: this.querySelector('.message'),
      notification: this.querySelector('.notification')
    }
  }

  init(event) {
    const { title, message, color } = event.detail

    this._elements.title.innerHTML = buildHtmlTextContent(title)
    this._elements.message.innerHTML = buildHtmlTextContent(message)
    this._elements.notification.setAttribute('data-intent', color)
  }
}

if (!customElements.get(embedWebElements.NOTIFICATION_ITEM)) {
  customElements.define(embedWebElements.NOTIFICATION_ITEM, NotificationItem)
}
