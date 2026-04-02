import WebElement from '@web-components/templates/WebElement'
import coloredTextCss from './ColoredText.raw.css?raw'
import coloredTextHtml from './ColoredText.raw.html?raw'

import { getPaintedFragments } from '@src/components/ColoredText/ColoredText.helpers'
import { embedWebElements } from '@src/constants/web-elements.constants'

class ColoredText extends WebElement {
  constructor() {
    super({
      html: coloredTextHtml,
      css: coloredTextCss
    })

    this.addEventListener('textchange', this._handleTextChange.bind(this))
  }

  _handleTextChange(event) {
    const text = event.detail
    const lineElement = this.$get('line')
    const fragments = getPaintedFragments(text)

    lineElement.replaceChildren()
    for (const fragment of fragments) {
      const spanElement = document.createElement('span')

      spanElement.innerText = fragment.value
      lineElement.append(spanElement)
    }

    console.log('💬 ~ fragments:', fragments)
  }
}

if (!customElements.get(embedWebElements.COLORED_TEXT)) {
  customElements.define(embedWebElements.COLORED_TEXT, ColoredText)
}
