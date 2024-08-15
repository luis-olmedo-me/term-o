export const uploadFile = () => {
  return new Promise(resolve => {
    const fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')

    fileInput.click()
    resolve()
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
