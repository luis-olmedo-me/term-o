import { createCssVariablesFromTheme } from '@src/helpers/themes.helpers'
import NotificationManagerCss from './NotificationManager.raw.css?raw'
import NotificationManagerHtml from './NotificationManager.raw.html?raw'

import { embedWebElements, webElements } from '@src/constants/web-elements.constants'
import { createWebElement } from '@src/helpers/web-components.helpers'

class NotificationManager extends HTMLElement {
  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = NotificationManagerHtml
    this._elements.styles.innerHTML = NotificationManagerCss
    this._individuals = []
    this._grouped = []
    this._isOpen = false

    this.addEventListener('add', this._handleAdd)
    this.addEventListener('theme', this._handleTheme)
  }

  connectedCallback() {
    this._elements.count.addEventListener('click', this._handleCounterClick.bind(this))
  }

  get _elements() {
    return {
      inidividuals: this._shadow.querySelector('#inidividuals'),
      grouped: this._shadow.querySelector('#grouped'),
      styles: this._shadow.querySelector('#styles'),
      theme: this._shadow.querySelector('#theme'),
      count: this._shadow.querySelector('#count')
    }
  }

  _handleAdd(event) {
    const initEvent = new CustomEvent('init', { detail: event.detail })
    const individualItem = createWebElement(
      embedWebElements.NOTIFICATION_ITEM,
      {},
      this._elements.inidividuals
    )
    const groupItem = createWebElement(
      embedWebElements.NOTIFICATION_ITEM,
      {},
      this._elements.grouped
    )
    const remove = () => this._removeNotification(individualItem, groupItem)

    individualItem.dispatchEvent(initEvent)
    groupItem.dispatchEvent(initEvent)

    this._hideAll()
    this._individuals = this._individuals.concat(individualItem)
    this._grouped = this._grouped.concat(groupItem)

    if (!this._isOpen) setTimeout(() => individualItem.classList.add('visible'), 20)
    this._updateCounter()

    individualItem.addEventListener('click', remove)
    groupItem.addEventListener('click', remove)
  }

  _handleTheme(event) {
    const { theme } = event.detail

    this._elements.theme.innerHTML = createCssVariablesFromTheme(theme, '#web-theme-provider')
  }

  _handleCounterClick() {
    this._isOpen = !this._isOpen

    if (this._isOpen) this._hideAll()
    else this._showLastOne()

    this._elements.grouped.setAttribute('data-visible', this._isOpen)
  }

  _showLastOne() {
    this._individuals.forEach((item, index) => {
      const isLastItem = index === this._individuals.length - 1
      const isVisible = item.classList.contains('visible')

      if (isLastItem && !isVisible) item.classList.add('visible')
      if (!isLastItem && isVisible) item.classList.remove('visible')
    })
  }

  _hideAll() {
    this._individuals.forEach(item => {
      const isVisible = item.classList.contains('visible')

      if (isVisible) item.classList.remove('visible')
    })
  }

  _removeNotification(individualItem, groupItem) {
    individualItem.classList.remove('visible')
    this._individuals = this._individuals.filter(item => item !== individualItem)
    this._grouped = this._grouped.filter(item => item !== groupItem)

    setTimeout(() => individualItem.remove(), 500)
    setTimeout(() => groupItem.remove(), 500)

    const lastNotificationItem = this._individuals.at(-1)
    if (!this._isOpen && lastNotificationItem) lastNotificationItem.classList.add('visible')

    this._updateCounter()
  }

  _updateCounter() {
    const count = this._individuals.length
    const label = count > 9 ? '+9' : String(count)

    this._elements.count.setAttribute('data-count', label)
    this._elements.count.setAttribute('data-visible', count > 1)
    this._elements.count.innerHTML = label
  }
}

if (!customElements.get(webElements.NOTIFICATION_MANAGER)) {
  customElements.define(webElements.NOTIFICATION_MANAGER, NotificationManager)
}
