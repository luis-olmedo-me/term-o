import { readFileContent } from '@content/helpers/file-management.helpers'

export default async resolve => {
  const fileInput = document.createElement('input')
  fileInput.setAttribute('type', 'file')
  fileInput.setAttribute('accept', '.termo.js')

  const cancel = () => {
    fileInput.removeEventListener('change', receiveFile)
    fileInput.removeEventListener('cancel', cancel)
    fileInput.remove()

    resolve(null)
  }
  const receiveFile = async event => {
    const [file] = Array.from(event.currentTarget.files)

    if (!file) cancel()

    if (!file.name.endsWith('.termo.js')) resolve(null)

    resolve({ name: file.name, content: await readFileContent(file) })
  }

  fileInput.addEventListener('change', receiveFile)
  fileInput.addEventListener('cancel', cancel)

  fileInput.click()
}
