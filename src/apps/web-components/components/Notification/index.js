import NotificationCss from './Notification.raw.css'
import NotificationHtml from './Notification.raw.html'

import { webElements } from '@src/constants/web-elements.constants'
import { delay } from '@src/helpers/utils.helpers'
import { applyCssVariables, getPropsFromAttrs } from '@web-components/helpers/props.helpers'
import { notificationPropNames } from './Notification.constants'
import { getNotificationBeforeElement } from './Notification.helpers'

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

    const notificationBefore = getNotificationBeforeElement({ currentId: this._props.id })

    this.setAttribute('id', this._props.id)
    this.setAttribute('index', '1')
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
    this._notificationBefore = notificationBefore

    this.addEventListener('click', this._closeDueToClick.bind(this))

    if (notificationBefore) notificationBefore.moveDownAt(this._nextStart)

    this._runAnimation({})
  }

  get _nextStart() {
    const rect = this._elements.notification.getBoundingClientRect()
    return rect.top + rect.height + 12
  }

  get _elements() {
    return {
      notification: this._shadow.querySelector('#notification'),
      wrapper: this._shadow.querySelector('#wrapper'),
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
    this._finish()
  }

  cancelAnimation() {
    clearTimeout(this._timerRemoval)
  }

  moveDownAt(positionY) {
    const currentIndex = this.getAttribute('index')
    const newIndex = Number(currentIndex) + 1

    this.setAttribute('index', newIndex)
    this._elements.wrapper.style.setProperty('top', `${positionY}px`)

    const rect = this._elements.notification.getBoundingClientRect()
    const start = rect.height + 12

    if (this._notificationBefore) this._notificationBefore.moveDownAt(start + positionY)
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

  _dispatch(name, detail = null) {
    const appearEvent = new CustomEvent(name, { detail })

    this.dispatchEvent(appearEvent)
  }
}

if (!customElements.get(webElements.NOTIFICATION)) {
  customElements.define(webElements.NOTIFICATION, Notification)
}
