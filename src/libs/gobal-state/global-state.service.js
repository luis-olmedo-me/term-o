import EventListener from '@src/templates/EventListener'
import { stateKeys } from './global-state.constants'

class GlobalState extends EventListener {
  constructor() {
    super()

    this.values = Object.keys(stateKeys).reduce((values, key) => {
      return { ...values, [key]: null }
    })
  }

  set(key, newValue) {
    if (!(key in this.values)) return

    this.values[key] = newValue
    this.dispatchEvent('change', this)
  }

  get(key) {
    return this.values[key]
  }
}

export const globalState = new GlobalState()
