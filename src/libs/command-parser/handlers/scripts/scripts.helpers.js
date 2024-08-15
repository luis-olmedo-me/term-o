import { getQuotedString } from '@src/helpers/utils.helpers'

export const uploadFile = () => {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('accept', '.termo.js')

    const cancel = () => {
      fileInput.removeEventListener('change', receiveFile)
      fileInput.removeEventListener('cancel', cancel)
      fileInput.remove()

      reject('No file was uploaded.')
    }
    const receiveFile = event => {
      const [file] = Array.from(event.currentTarget.files)
      const fileName = getQuotedString(file.name)

      if (!file) cancel()

      if (file.name.endsWith('.termo.js')) resolve(file)
      else
        reject(
          `Invalid file extension. "*.termo.js" was expected. Instead, it received ${fileName}`
        )
    }

    fileInput.addEventListener('change', receiveFile)
    fileInput.addEventListener('cancel', cancel)

    fileInput.click()
  })
}

export const readFileContent = file => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.addEventListener('load', () => {
      resolve(fileReader.result)
    })

    fileReader.addEventListener('error', () => {
      reject('There was an error reading the file content.')
    })

    fileReader.readAsText(file)
  })
}
