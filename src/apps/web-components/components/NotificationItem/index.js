import WebElement from '@web-components/templates/WebElement'
import { buildHtmlTextContent } from './NotificationItem.helpers'
import NotificationItemHtml from './NotificationItem.raw.html?raw'

import { embedWebElements } from '@src/constants/web-elements.constants'

class NotificationItem extends WebElement {
  constructor() {
    super({
      html: NotificationItemHtml,
      child: true
    })

    this.addEventListener('init', this.init)
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

    const titleElement = this.$get('title')
    const messageElement = this.$get('message')
    const notificationElement = this.$get('notification')

    titleElement.innerHTML = buildHtmlTextContent(title)
    messageElement.innerHTML = buildHtmlTextContent(message)
    notificationElement.setAttribute('data-intent', color)
  }
}

if (!customElements.get(embedWebElements.NOTIFICATION_ITEM)) {
  customElements.define(embedWebElements.NOTIFICATION_ITEM, NotificationItem)
}
