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
