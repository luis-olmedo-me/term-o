export default async (resolve, reject, data) => {
  try {
    console.log('test', { data })
    resolve('input test')
  } catch (error) {
    reject('Unexpected error when trying to request input.')
  }
}
