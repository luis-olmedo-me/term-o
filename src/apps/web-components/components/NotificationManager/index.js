import WebElement from '@web-components/templates/WebElement'
import NotificationManagerCss from './NotificationManager.css?raw'
import NotificationManagerHtml from './NotificationManager.html?raw'

import { NOTIFICATION_MAX } from '@src/constants/notifications.constants'
import { embedWebElements, webElements } from '@src/constants/web-elements.constants'
import { createWebElement } from '@src/helpers/web-components.helpers'

class NotificationManager extends WebElement {
  constructor() {
    super({
      html: NotificationManagerHtml,
      css: NotificationManagerCss,
      isolated: true
    })

    this._notifications = []
    this._isExpanded = false

    this.addEventListener('add', this._handleAdd)
  }

  $onConnectedCallback() {
    const count = this.$get('count')

    count.addEventListener('click', this._handleCounterClick.bind(this))
  }

  _handleAdd(event) {
    const manager = this.$get('manager')
    const notificationItem = createWebElement(embedWebElements.NOTIFICATION_ITEM, {
      root: this._root,
      theme: this.$theme(),
      props: event.detail,
      below: manager
    })

    this._notifications = [notificationItem, ...this._notifications]
    this._isExpanded = false

    requestAnimationFrame(() => this._collapse())
    this._updateCounter()

    notificationItem.addEventListener('click', event => {
      event.stopPropagation()

      this._removeNotification(notificationItem)
    })
  }

  _handleCounterClick(event) {
    event.stopPropagation()
    this._isExpanded = !this._isExpanded

    if (this._isExpanded) this._expand()
    else this._collapse()
  }

  _collapse() {
    this._notifications.forEach((item, index) => {
      const isFirstItem = index === 0
      const isVisible = item.classList.contains('visible')

      item.style.removeProperty('top')
      if (isFirstItem && !isVisible) item.classList.add('visible')
      if (!isFirstItem && isVisible) item.classList.remove('visible')
    })
  }

  _expand() {
    const areLessThanThree = this._notifications.length <= NOTIFICATION_MAX
    let carriedTop = 0

    this._notifications.forEach((item, index) => {
      const shouldDisplay = areLessThanThree || index < NOTIFICATION_MAX
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

    if (this._isExpanded) this._expand()
    else this._collapse()

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
