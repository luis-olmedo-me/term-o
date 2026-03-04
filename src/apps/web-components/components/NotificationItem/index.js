import { buildHtmlTextContent } from './NotificationItem.helpers'
import NotificationItemHtml from './NotificationItem.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'

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
      styles: this.querySelector('#styles'),
      wrapper: this.querySelector('#wrapper'),
      title: this.querySelector('#title'),
      message: this.querySelector('#message')
    }
  }

  init(event) {
    const { title, message } = event.detail

    this.querySelector('#title').innerHTML = buildHtmlTextContent(title)
    this.querySelector('#message').innerHTML = buildHtmlTextContent(message)
  }
}

if (!customElements.get(webElements.NOTIFICATION_ITEM)) {
  customElements.define(webElements.NOTIFICATION_ITEM, NotificationItem)
}
