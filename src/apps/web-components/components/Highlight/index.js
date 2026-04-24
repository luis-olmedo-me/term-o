import WebElement from '@web-components/templates/WebElement'
import HighlightCss from './Highlight.raw.css?raw'
import HighlightHtml from './Highlight.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'
import { delay } from '@src/helpers/utils.helpers'

class Highlight extends WebElement {
  constructor() {
    super({
      html: HighlightHtml,
      css: HighlightCss,
      isolated: true
    })

    this._handleOverlayScrollRef = this._handleOverlayScroll.bind(this)
  }

  $onPropsLoaded() {
    const overlay = this.$get('overlay')

    this.$addStyles(overlay, {
      top: this.$prop('top'),
      left: this.$prop('left'),
      width: this.$prop('width'),
      height: this.$prop('height'),
      'border-radius': this.$prop('borderRadius')
    })

    window.addEventListener('scroll', this._handleOverlayScrollRef)

    if (this.$prop('isVisible')) this._runAnimation()
    else this._runWithoutAnimation()
  }

  async _runAnimation() {
    const overlay = this.$get('overlay')

    await delay(20)
    overlay.classList.add('active')

    await delay(400)
    overlay.classList.remove('active')
    overlay.classList.add('fade-out')
    this.$dispatch('fadingstart')

    await delay(700)
    window.removeEventListener('scroll', this._handleOverlayScrollRef)
    this.remove()
  }

  async _runWithoutAnimation() {
    await delay(20)
    this.$dispatch('fadingstart')

    await delay(100)
    window.removeEventListener('scroll', this._handleOverlayScrollRef)
    this.remove()
  }

  _handleOverlayScroll() {
    const overlay = this.$get('overlay')

    window.removeEventListener('scroll', this._handleOverlayScrollRef)
    overlay.classList.add('canceled')
  }
}

if (!customElements.get(webElements.HIGHLIGHT)) {
  customElements.define(webElements.HIGHLIGHT, Highlight)
}
