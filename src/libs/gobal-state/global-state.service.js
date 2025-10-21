import { stateKeys } from './global-state.constants'

class GlobalState {
  constructor() {
    this.values = Object.keys(stateKeys).reduce((values, key) => {
      return { ...values, [key]: null }
    })
  }

  set(key, newValue) {
    if (!(key in this.values)) return

    this.values[key] = newValue
  }

  get(key) {
    return this.values[key]
  }
}

export const globalState = new GlobalState()
