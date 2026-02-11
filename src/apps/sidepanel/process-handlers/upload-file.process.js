import { readFileContent, uploader } from '@src/helpers/file.helpers'

export default async (resolve, reject, data) => {
  try {
    const input = uploader({
      extensions: data.extensions,
      onError: reject,
      onUpload: async file =>
        resolve({
          name: file.name,
          content: await readFileContent(file),
          lastVisitTime: file.lastModifiedDate.toISOString(),
          size: `${file.size}B`
        })
    })

    input.open()
  } catch (error) {
    reject('Unexpected error when trying to upload a file.')
  }
}
