import storage from '@src/libs/storage'

import { uploader } from '@src/helpers/file.helpers'

export const handleImportConfiguration = ({ onError }) => {
  const input = uploader({
    extension: 'txt',
    onError,
    onUpload: file => storage.import(file).catch(onError)
  })

  input.open()
}
