import { createBubble } from '@content/helpers/web-components.helpers'
import { readFileContent, uploader } from '@src/helpers/file.helpers'

export default async (resolve, reject, data) => {
  const bubble = createBubble({ message: 'Upload a file', theme: data.theme })
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
    bubble.remove()
    input.open()
  }

  bubble.addEventListener('click', openFileDialog)
  bubble.addEventListener('error', event => reject(event.detail))
}
