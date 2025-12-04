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

export const download = (filename, text) => {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)
  element.style.setProperty('display', 'none')

  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export const uploader = ({ extension, onUpload, onError }) => {
  const fileInput = document.createElement('input')
  fileInput.setAttribute('type', 'file')
  fileInput.setAttribute('accept', `.termo.${extension}`)

  const handleCancel = () => {
    fileInput.removeEventListener('change', handleUpload)
    fileInput.removeEventListener('cancel', handleCancel)
    fileInput.remove()

    onError('The file selection was canceled by the user.')
  }
  const handleUpload = event => {
    const [file] = Array.from(event.currentTarget.files)

    if (!file) return handleCancel()
    if (!file.name.endsWith(`.termo.${extension}`))
      return onError(
        `The uploaded file does not match the required extension (*.termo.${extension}).`
      )

    onUpload(file)
  }

  fileInput.addEventListener('change', handleUpload)
  fileInput.addEventListener('cancel', handleCancel)

  return { element: fileInput, open: () => fileInput.click() }
}
