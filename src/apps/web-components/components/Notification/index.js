import NotificationCss from './Notification.raw.css'
import NotificationHtml from './Notification.raw.html'

import { webElements } from '@src/constants/web-elements.constants'
import { delay } from '@src/helpers/utils.helpers'
import { applyCssVariables, getPropsFromAttrs } from '@web-components/helpers/props.helpers'
import { notificationPropNames } from './Notification.constants'

class Notification extends HTMLElement {
  constructor() {
    super()
    this._shadow = this.attachShadow({ mode: 'closed' })
    this.isFinished = false

    this._shadow.innerHTML = NotificationHtml
  }

  connectedCallback() {
    this._props = getPropsFromAttrs(this, notificationPropNames)
    this._elements.styles.innerHTML = applyCssVariables(NotificationCss, {
      font: this._props.font,
      white: this._props.white,
      accent: this._props.accent,
      foreground: this._props.foreground,
      background: this._props.background
    })
    this._elements.message.innerHTML = this._props.message

    this.addEventListener('click', this._closeDueToClick.bind(this))

    this._runAnimation()
  }

  get _elements() {
    return {
      notification: this._shadow.querySelector('#notification'),
      message: this._shadow.querySelector('#message'),
      styles: this._shadow.querySelector('#styles')
    }
  }

  async _runAnimation() {
    await delay(20)
    if (this.isFinished) return
    this._elements.notification.classList.add('active')

    await delay(300)
    if (this.isFinished) return
    this._elements.notification.classList.add('pulse')

    await delay(8700)
    if (this.isFinished) return
    this._elements.notification.classList.remove('active')

    await delay(400)
    if (this.isFinished) return
    this._closeDueToTimeout()
  }

  _closeDueToTimeout() {
    const autoClosedEvent = new CustomEvent('error', {
      detail: 'The notification closed automatically because no action was taken in time.'
    })

    this.dispatchEvent(autoClosedEvent)
    this.remove()
  }

  async _closeDueToClick() {
    this.isFinished = true
    this._elements.notification.classList.remove('active')

    await delay(400)
    this.remove()
  }
}

if (!customElements.get(webElements.NOTIFICATION)) {
  customElements.define(webElements.NOTIFICATION, Notification)
}
