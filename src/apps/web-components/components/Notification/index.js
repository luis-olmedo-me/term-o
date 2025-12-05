import NotificationCss from './Notification.raw.css'
import NotificationHtml from './Notification.raw.html'

import { webElements } from '@src/constants/web-elements.constants'
import { delay } from '@src/helpers/utils.helpers'
import { applyCssVariables, getPropsFromAttrs } from '@web-components/helpers/props.helpers'
import { notificationPropNames } from './Notification.constants'
import { getLastNotificationElement } from './Notification.helpers'

class Notification extends HTMLElement {
  _timerAppear = null
  _timerDimming = null
  _timerRemoval = null

  constructor() {
    super()
    this._shadow = this.attachShadow({ mode: 'closed' })
    this.isFinished = false

    this._shadow.innerHTML = NotificationHtml
  }

  connectedCallback() {
    this._props = getPropsFromAttrs(this, notificationPropNames)

    const { lastNotification, index } = getLastNotificationElement({ currentId: this._props.id })

    this.setAttribute('id', this._props.id)
    this.setAttribute('index', index)
    this._elements.styles.innerHTML = applyCssVariables(NotificationCss, {
      font: this._props.font,
      white: this._props.white,
      accent: this._props.accent,
      brightBlack: this._props.brightBlack,
      foreground: this._props.foreground,
      background: this._props.background
    })
    this._elements.title.innerHTML = this._props.title
    this._elements.message.innerHTML = this._props.message
    this._elements.notification.classList.add('hidden')
    this._lastNotification = lastNotification

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

    this._timerAppear = this.animate(() => {
      this._dispatch('appear')
      this._elements.notification.classList.add('lights-dimming')
      this._elements.notification.classList.remove('activate')
    }, 300)

    this._timerDimming = this.animate(() => {
      this._elements.notification.classList.remove('activate')
      this._elements.notification.classList.add('desactivate')
    }, 10300)

    this._timerRemoval = this.animate(() => this._finish(), 10600)
  }

  animate(callback, time) {
    return setTimeout(() => {
      if (this.isFinished) return

      requestAnimationFrame(() => {
        callback.call(this)
      })
    }, time - 25)
  }

  async _closeDueToClick() {
    this.isFinished = true
    this._elements.notification.classList.add('desactivate')
    this._elements.notification.classList.remove('lights-dimming')
    this._elements.notification.classList.remove('activate')

    await delay(275)
    this._finish()
  }

  async _finish() {
    this._dispatch('done')
    await delay(10)
    this.remove()
  }

  _dispatch(name, message = null) {
    const appearEvent = new CustomEvent(name, { detail: message })

    this.dispatchEvent(appearEvent)
  }
}

if (!customElements.get(webElements.NOTIFICATION)) {
  customElements.define(webElements.NOTIFICATION, Notification)
}
