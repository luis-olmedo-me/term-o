export const uploadFile = () => {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')

    const cancel = () => {
      fileInput.removeEventListener('change', receiveFile)
      fileInput.removeEventListener('cancel', cancel)
      fileInput.remove()

      reject('No file was uploaded.')
    }
    const receiveFile = event => {
      const [firstFile] = Array.from(event.currentTarget.files)

      if (firstFile) resolve(firstFile)
      else cancel()
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
