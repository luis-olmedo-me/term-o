import WebElement from '@web-components/templates/WebElement'
import HighlightCss from './Highlight.raw.css?raw'
import HighlightHtml from './Highlight.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'
import { delay } from '@src/helpers/utils.helpers'
// import { applyCssVariables, getPropsFromAttrs } from '@web-components/helpers/props.helpers'
// import { highlightPropNames } from './Highlight.constants'

class Highlight extends WebElement {
  constructor() {
    super({
      html: HighlightHtml,
      css: HighlightCss,
      isolated: true
    })
  }

  $onPropsLoaded() {
    const overlay = this.$get('overlay')
    console.log('💬 ~ overlay:', overlay)

    this.$addStyles(overlay, {
      top: this.$prop('top'),
      left: this.$prop('left'),
      width: this.$prop('width'),
      height: this.$prop('height'),
      'border-radius': this.$prop('borderRadius')
    })

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
    this.remove()
  }

  async _runWithoutAnimation() {
    await delay(20)
    this.$dispatch('fadingstart')

    await delay(100)
    this.remove()
  }
}

if (!customElements.get(webElements.HIGHLIGHT)) {
  customElements.define(webElements.HIGHLIGHT, Highlight)
}
