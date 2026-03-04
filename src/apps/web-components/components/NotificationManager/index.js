import { createCssVariablesFromTheme } from '@src/helpers/themes.helpers'
import NotificationManagerCss from './NotificationManager.raw.css?raw'
import NotificationManagerHtml from './NotificationManager.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'
import { createWebElement } from '@src/helpers/web-components.helpers'

class NotificationManager extends HTMLElement {
  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = NotificationManagerHtml
    this._elements.styles.innerHTML = NotificationManagerCss
    this._notifications = []

    this.addEventListener('add', this._handleAdd)
    this.addEventListener('theme', this._handleTheme)
  }

  connectedCallback() {
    this.setAttribute('id', 'notifier')
  }

  get _elements() {
    return {
      wrapper: this._shadow.querySelector('#wrapper'),
      styles: this._shadow.querySelector('#styles'),
      theme: this._shadow.querySelector('#theme'),
      count: this._shadow.querySelector('#count')
    }
  }

  _handleAdd(event) {
    const initEvent = new CustomEvent('init', { detail: event.detail })
    const notificationItem = createWebElement(
      webElements.NOTIFICATION_ITEM,
      {},
      this._elements.wrapper
    )

    notificationItem.dispatchEvent(initEvent)
    this._notifications.forEach(item => item.classList.remove('visible'))
    this._notifications = this._notifications.concat(notificationItem)

    setTimeout(() => notificationItem.classList.add('visible'), 20)
    this._updateCounter()

    notificationItem.addEventListener('click', () => this._removeNotification(notificationItem))
  }

  _handleTheme(event) {
    const { theme } = event.detail

    this._elements.theme.innerHTML = createCssVariablesFromTheme(theme, '#web-theme-provider')
  }

  _removeNotification(notificationItem) {
    notificationItem.classList.remove('visible')
    this._notifications = this._notifications.filter(item => item !== notificationItem)

    setTimeout(() => notificationItem.remove(), 500)

    const lastNotificationItem = this._notifications.at(-1)
    if (lastNotificationItem) lastNotificationItem.classList.add('visible')

    this._updateCounter()
  }

  _updateCounter() {
    const count = this._notifications.length
    const label = count > 9 ? '+9' : String(count)

    this._elements.count.setAttribute('data-count', label)
    this._elements.count.setAttribute('data-visible', count > 1)
    this._elements.count.innerHTML = String(label)
  }
}

if (!customElements.get(webElements.NOTIFICATION_MANAGER)) {
  customElements.define(webElements.NOTIFICATION_MANAGER, NotificationManager)
}
