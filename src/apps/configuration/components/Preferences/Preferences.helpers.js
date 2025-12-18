import storage from '@src/libs/storage'

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
