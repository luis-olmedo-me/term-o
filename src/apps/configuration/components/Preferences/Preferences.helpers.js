import storage from '@src/libs/storage'

import { uploader } from '@src/helpers/file.helpers'

export const handleImportConfiguration = setErrorMessage => {
  const input = uploader({
    extension: 'txt',
    onError: setErrorMessage,
    onUpload: file =>
      storage
        .import(file)
        .catch(setErrorMessage)
        .then(() => setErrorMessage(null))
  })

  input.open()
}
