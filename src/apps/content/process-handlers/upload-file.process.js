import { readFileContent } from '@content/helpers/file-management.helpers'
import { getQuotedString } from '@src/helpers/utils.helpers'

export default async resolve => {
  try {
    const fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('accept', '.termo.js')

    const cancel = () => {
      fileInput.removeEventListener('change', receiveFile)
      fileInput.removeEventListener('cancel', cancel)
      fileInput.remove()

      throw 'No file was uploaded.'
    }
    const receiveFile = async event => {
      const [file] = Array.from(event.currentTarget.files)
      const fileName = getQuotedString(file.name)

      if (!file) cancel()

      if (!file.name.endsWith('.termo.js'))
        throw `Invalid file extension. "*.termo.js" was expected. Instead, it received ${fileName}`

      resolve({ name: file.name, content: await readFileContent(file) })
    }

    fileInput.addEventListener('change', receiveFile)
    fileInput.addEventListener('cancel', cancel)

    fileInput.click()
  } catch (error) {
    console.log('💬 ~ error:', error)
    throw error
  }
}
