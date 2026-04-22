import WebElement from '@web-components/templates/WebElement'
import NotificationManagerCss from './NotificationManager.raw.css?raw'
import NotificationManagerHtml from './NotificationManager.raw.html?raw'

import { embedWebElements, webElements } from '@src/constants/web-elements.constants'
import { createWebElement } from '@src/helpers/web-components.helpers'

class NotificationManager extends WebElement {
  constructor() {
    super({
      html: NotificationManagerHtml,
      css: NotificationManagerCss
    })

    this._notifications = []
    this._displayThree = false

    this.addEventListener('add', this._handleAdd)
  }

  connectedCallback() {
    const count = this.$get('count')

    count.addEventListener('click', this._handleCounterClick.bind(this))
  }

  _handleAdd(event) {
    const wrapper = this.$get('wrapper')
    const initEvent = new CustomEvent('init', { detail: event.detail })
    const notificationItem = createWebElement(embedWebElements.NOTIFICATION_ITEM, {}, wrapper)

    notificationItem.dispatchEvent(initEvent)
    this._notifications = [notificationItem, ...this._notifications]
    this._displayThree = false

    requestAnimationFrame(() => this._showFirstOne())
    this._updateCounter()

    notificationItem.addEventListener('click', () => this._removeNotification(notificationItem))
  }

  _handleCounterClick() {
    this._displayThree = !this._displayThree

    if (this._displayThree) this._showFirstThree()
    else this._showFirstOne()
  }

  _showFirstOne() {
    this._notifications.forEach((item, index) => {
      const isFirstItem = index === 0
      const isVisible = item.classList.contains('visible')

      item.style.removeProperty('top')
      if (isFirstItem && !isVisible) item.classList.add('visible')
      if (!isFirstItem && isVisible) item.classList.remove('visible')
    })
  }

  _showFirstThree() {
    const areLessThanThree = this._notifications.length <= 3
    let carriedTop = 0

    this._notifications.forEach((item, index) => {
      const shouldDisplay = areLessThanThree || index < 3
      const isVisible = item.classList.contains('visible')

      if (shouldDisplay && !isVisible) item.classList.add('visible')
      if (!shouldDisplay && isVisible) item.classList.remove('visible')

      if (!shouldDisplay) return
      item.style.setProperty('top', `${carriedTop}px`)
      carriedTop = item.clientHeight + carriedTop + 12
    })
  }

  _removeNotification(notificationItem) {
    notificationItem.classList.remove('visible')
    this._notifications = this._notifications.filter(item => item !== notificationItem)

    if (this._displayThree) this._showFirstThree()
    else this._showFirstOne()

    setTimeout(() => notificationItem.remove(), 500)

    this._updateCounter()
  }

  _updateCounter() {
    const count = this.$get('count')
    const notificationsCount = this._notifications.length
    const label = notificationsCount > 9 ? '+9' : String(notificationsCount)

    count.setAttribute('data-count', label)
    count.setAttribute('data-visible', notificationsCount > 1)
    count.innerHTML = String(label)
  }
}

if (!customElements.get(webElements.NOTIFICATION_MANAGER)) {
  customElements.define(webElements.NOTIFICATION_MANAGER, NotificationManager)
}
