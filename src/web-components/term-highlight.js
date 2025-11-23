import { delay } from '@src/helpers/utils.helpers'

class TermHighlight extends HTMLElement {
  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
  }

  connectedCallback() {
    const color = this.getAttribute('color') || '#3b82f6'
    const radius = this.getAttribute('radius') || '0px'
    const duration = Number(this.getAttribute('duration') || 700)

    this._shadow.innerHTML = `
      <style>
        .overlay {
          position: absolute;
          inset: 0;
          border-radius: ${radius};
          background: transparent;
          border: 1px solid transparent;
          opacity: 0;
          transform: scale(1.4);
          box-shadow: 0 0 0 transparent;

          transition:
            opacity .2s ease-in-out,
            transform .2s ease-in-out,
            box-shadow .2s ease-in-out,
            border-color .2s ease-in-out,
            background-color .2s ease-in-out;
        }

        .overlay.active {
          opacity: 1;
          transform: scale(1);
          background-color: ${color};
          border-color: ${color};
          box-shadow: 0 0 15px ${color};
        }

        .overlay.fade-out {
          transition:
            opacity .3s ease-in-out,
            transform .5s ease-in-out,
            box-shadow .6s ease-in-out,
            border-color .5s ease-in-out,
            background-color .5s ease-in-out;

          opacity: 0;
          transform: scale(1.3);
          box-shadow: 0 0 10px ${color};
        }
      </style>

      <div class="overlay"></div>
    `

    this._overlay = this._shadow.querySelector('.overlay')
    this._runAnimation(duration)
  }

  async _runAnimation(duration) {
    await delay(20)
    this._overlay.classList.add('active')

    await delay(400)
    this._overlay.classList.remove('active')
    this._overlay.classList.add('fade-out')

    await delay(duration)
    this.remove()
  }
}

if (!customElements.get('term-highlight')) {
  customElements.define('term-highlight', TermHighlight)
}
