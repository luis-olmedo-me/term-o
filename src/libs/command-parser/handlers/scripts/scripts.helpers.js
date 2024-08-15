export const uploadFile = () => {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')

    const receiveFile = event => {
      const [firstFile] = Array.from(event.currentTarget.files)

      if (firstFile) resolve(firstFile)
      else reject('No file was uploaded.')
    }

    const cancel = () => {
      fileInput.remove()

      reject('No file was uploaded.')
    }

    fileInput.addEventListener('change', receiveFile)
    fileInput.addEventListener('cancel', cancel)

    fileInput.click()
  })

  //   if (fileInput.files.length === 0) {
  //     throw new Error('No se ha seleccionado ningún archivo.')
  //   }

  //   const archivo = fileInput.files[0]
  //   const lector = new FileReader()

  //   return new Promise((resolve, reject) => {
  //     lector.onload = () => {
  //       resolve(lector.result)
  //     }

  //     lector.onerror = () => {
  //       reject(new Error('Error al leer el archivo.'))
  //     }

  //     lector.readAsText(archivo)
  //   })
}
