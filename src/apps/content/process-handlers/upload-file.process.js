import { durations } from '@src/constants/web-elements.constants'
import { readFileContent, uploader } from '@src/helpers/file.helpers'
import { createNotification } from '@src/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const notification = createNotification({
    title: 'Term-O | Action required to proceed',
    message: 'Click to start uploading a file',
    theme: data.theme,
    duration: durations.EXTENDED
  })

  const input = uploader({
    extension: 'js',
    onError: reject,
    onUpload: async file =>
      resolve({
        name: file.name,
        content: await readFileContent(file),
        lastVisitTime: file.lastModifiedDate.toISOString(),
        size: `${file.size}B`
      })
  })

  const openFileDialog = () => {
    input.open()
  }

  notification.addEventListener('click', openFileDialog)
  notification.addEventListener('timeout', event => reject(event.detail))
}
