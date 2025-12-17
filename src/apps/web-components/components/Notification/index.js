import NotificationCss from './Notification.raw.css'
import NotificationHtml from './Notification.raw.html'

import { webElements } from '@src/constants/web-elements.constants'
import { delay } from '@src/helpers/utils.helpers'
import {
  applyCssVariablesFromTheme,
  getPropsFromAttrs
} from '@web-components/helpers/props.helpers'
import {
  dimmingTime,
  dummyKeyframes,
  notificationPropNames,
  transitionTime
} from './Notification.constants'
import { getNotificationBeforeElement } from './Notification.helpers'

class Notification extends HTMLElement {
  _timerAnimation = null
  _isFinished = false

  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = NotificationHtml

    this._handleDesactivationRef = this._handleDesactivation.bind(this)
    this.addEventListener('theme', this._handleTheme)
  }

  connectedCallback() {
    this._props = getPropsFromAttrs(this, notificationPropNames)

    const notificationBefore = getNotificationBeforeElement({ currentId: this._props.id })

    this.setAttribute('id', this._props.id)
    this._updateIndex(1)
    this._elements.title.innerHTML = this._props.title
    this._elements.message.innerHTML = this._props.message
    this._notificationBefore = notificationBefore

    this.addEventListener('click', this._closeDueToClick.bind(this))

    if (notificationBefore) notificationBefore.moveDown()

    this._runAnimation({})
  }

  moveDown(forcedIndex = null) {
    const index = this.getAttribute('index')
    const currentIndex = Number(index)
    const newIndex = forcedIndex ?? currentIndex + 1
    const nextIndex = this._isFinished ? newIndex : null

    if (!this._isFinished) this._updateIndex(newIndex)
    if (this._notificationBefore) this._notificationBefore.moveDown(nextIndex)
  }

  moveUp(forcedIndex = null) {
    const index = this.getAttribute('index')
    const currentIndex = Number(index)
    const newIndex = forcedIndex ?? currentIndex - 1
    const nextIndex = this._isFinished ? newIndex : null

    if (!this._isFinished) this._updateIndex(newIndex)
    if (this._notificationBefore) this._notificationBefore.moveUp(nextIndex)
  }

  get _elements() {
    return {
      notification: this._shadow.querySelector('#notification'),
      wrapper: this._shadow.querySelector('#wrapper'),
      message: this._shadow.querySelector('#message'),
      title: this._shadow.querySelector('#title'),
      styles: this._shadow.querySelector('#styles'),
      timer: this._shadow.querySelector('#timer')
    }
  }

  _handleTheme(event) {
    const newTheme = event.detail

    this._elements.styles.innerHTML = applyCssVariablesFromTheme(NotificationCss, newTheme)
  }

  _updateIndex(newIndex) {
    const rect = this._elements.wrapper.getBoundingClientRect()
    const positionY = rect.height * (newIndex - 1)

    this.setAttribute('index', newIndex)
    this._elements.wrapper.setAttribute('index', newIndex)
    this._elements.wrapper.style.setProperty('top', `${positionY}px`)
    this._scheduleDesactivation(newIndex * 300)
  }

  async _runAnimation() {
    this._elements.wrapper.classList.add('activate')
    this._elements.notification.classList.add('lights-dimming')
    this._dispatch('appear')

    this._scheduleDesactivation()
  }

  _handleDesactivation() {
    if (this._isFinished) return

    this._finish()
  }

  _scheduleDesactivation(time = 0) {
    const duration = time + dimmingTime

    if (this._timerAnimation) this._timerAnimation.cancel()

    this._timerAnimation = this._elements.timer.animate(dummyKeyframes, { duration })

    this._timerAnimation.finished.then(this._handleDesactivationRef)
  }

  async _closeDueToClick() {
    this.isFinished = true
    this._finish()
  }

  async _finish() {
    this._elements.wrapper.classList.remove('activate')
    if (this._notificationBefore) this._notificationBefore.moveUp()

    await delay(transitionTime)
    this._dispatch('done')
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
