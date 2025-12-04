import NotificationCss from './Notification.raw.css'
import NotificationHtml from './Notification.raw.html'

import { webElements } from '@src/constants/web-elements.constants'
import { delay } from '@src/helpers/utils.helpers'
import { applyCssVariables, getPropsFromAttrs } from '@web-components/helpers/props.helpers'
import { notificationPropNames } from './Notification.constants'
import { getLastNotificationElement } from './Notification.helpers'

class Notification extends HTMLElement {
  constructor() {
    super()
    this._shadow = this.attachShadow({ mode: 'closed' })
    this.isFinished = false

    this._shadow.innerHTML = NotificationHtml
  }

  connectedCallback() {
    this._props = getPropsFromAttrs(this, notificationPropNames)
    this.setAttribute('id', this._props.id)

    const { lastNotification, top } = getLastNotificationElement({ currentId: this._props.id })

    this._elements.styles.innerHTML = applyCssVariables(NotificationCss, {
      font: this._props.font,
      white: this._props.white,
      accent: this._props.accent,
      brightBlack: this._props.brightBlack,
      foreground: this._props.foreground,
      background: this._props.background,
      top: `${top}px`
    })
    this._elements.title.innerHTML = this._props.title
    this._elements.message.innerHTML = this._props.message
    this._elements.notification.classList.add('hidden')

    this.addEventListener('click', this._closeDueToClick.bind(this))
    if (lastNotification) lastNotification.addEventListener('done', this._runAnimation.bind(this))
    else this._runAnimation()
  }

  get _elements() {
    return {
      notification: this._shadow.querySelector('#notification'),
      message: this._shadow.querySelector('#message'),
      title: this._shadow.querySelector('#title'),
      styles: this._shadow.querySelector('#styles')
    }
  }

  async _runAnimation() {
    if (this.isFinished) return
    this._elements.notification.classList.remove('hidden')
    this._elements.notification.classList.add('activate')

    await delay(275)
    if (this.isFinished) return
    this._dispatch('appear')
    this._elements.notification.classList.add('lights-dimming')
    this._elements.notification.classList.remove('activate')

    await delay(9975)
    if (this.isFinished) return
    this._elements.notification.classList.remove('activate')
    this._elements.notification.classList.add('desactivate')

    await delay(275)
    if (this.isFinished) return
    this._closeDueToTimeout()
  }

  _closeDueToTimeout() {
    this._dispatch(
      'error',
      'The notification closed automatically because no action was taken in time.'
    )
    this._finish()
  }

  async _closeDueToClick() {
    this.isFinished = true
    this._elements.notification.classList.add('desactivate')
    this._elements.notification.classList.remove('lights-dimming')
    this._elements.notification.classList.remove('activate')

    await delay(275)
    this._finish()
  }

  _finish() {
    this.remove()
    this._dispatch('done')
  }

  _dispatch(name, message = null) {
    const appearEvent = new CustomEvent(name, { detail: message })

    this.dispatchEvent(appearEvent)
  }
}

if (!customElements.get(webElements.NOTIFICATION)) {
  customElements.define(webElements.NOTIFICATION, Notification)
}
