import { getParamValue } from '@src/helpers/arguments.helpers'
import { getQuotedString } from '@src/helpers/utils.helpers'

export class Argument {
  constructor(value) {
    this.backup = value
    this.value = value
    this.isHoldingUp = false
  }

  setValue(newValue) {
    this.isHoldingUp = false
    this.value = newValue
  }

  holdUp() {
    this.isHoldingUp = true
  }

  getValueFromArgs(stringArgs, args) {
    const indexes = this._getIndexes(args.length)
    const useString = this.backup === '$-'

    return useString ? getQuotedString(stringArgs) : getParamValue(indexes, args)
  }

  _getIndexes(maxCountOfIndexes) {
    const value = this.backup
    const paramPattern = /^\$\d+(,\d+)?(-\d+)?$/

    if (value === '$.') {
      var indexes = []

      for (let index = 0; index < maxCountOfIndexes; index++) {
        indexes = indexes.concat(index)
      }

      return indexes
    }

    if (paramPattern.test(value)) {
      const indexesAsString = value.replace('$', '')

      return JSON.parse(`[${indexesAsString}]`)
    }

    return -1
  }
}
