import Bell from '@src/svg/bell.svg?raw'
import WebElement from '@web-components/templates/WebElement'
import NotificationItemHtml from './NotificationItem.html?raw'

import { embedWebElements } from '@src/constants/web-elements.constants'
import { buildHtmlTextContent } from './NotificationItem.helpers'

class NotificationItem extends WebElement {
  constructor() {
    super({
      html: NotificationItemHtml,
      isolated: false
    })
  }

  $onPropsLoaded() {
    const title = this.$prop('title')
    const message = this.$prop('message')
    const color = this.$prop('color')

    const titleElement = this.$get('title')
    const messageElement = this.$get('message')
    const notificationElement = this.$get('notification')
    const iconContainerElement = this.$get('icon-container')

    titleElement.innerHTML = buildHtmlTextContent(title)
    messageElement.innerHTML = buildHtmlTextContent(message)
    iconContainerElement.innerHTML = Bell

    notificationElement.setAttribute('data-bgcolor', color)
    notificationElement.style.setProperty('--color', `var(--colors-${color})`)
  }
}

if (!customElements.get(embedWebElements.NOTIFICATION_ITEM)) {
  customElements.define(embedWebElements.NOTIFICATION_ITEM, NotificationItem)
}
