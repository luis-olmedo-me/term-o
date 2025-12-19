import storage from '@src/libs/storage'

import { availableInputTypes } from '@src/constants/inputs.constants'
import { uploader } from '@src/helpers/file.helpers'

export const handleImportConfig = ({ onError }) => {
  return new Promise((resolve, reject) => {
    const handleError = message => {
      onError(message)
      reject(message)
    }

    const input = uploader({
      extension: 'txt',
      onError: handleError,
      onUpload: file => storage.import(file).catch(handleError).then(resolve)
    })

    input.open()
  })
}

export const getInputMessageByType = (input, oldValue, newValue) => {
  if (input.type === availableInputTypes.BOOLEAN) {
    const oldUIValue = oldValue ? 'On' : 'Off'
    const newUIValue = newValue ? 'On' : 'Off'

    return `${oldUIValue} -> ${newUIValue}`
  }

  if (input.type === availableInputTypes.NUMBER) {
    return `${oldValue} -> ${newValue}`
  }

  if (input.type === availableInputTypes.SELECT) {
    const oldUIValue = input.options.find(option => option.id === oldValue).name
    const newUIValue = input.options.find(option => option.id === newValue).name

    return `"${oldUIValue}" -> "${newUIValue}"`
  }

  return `"${oldValue}" -> "${newValue}"`
}
