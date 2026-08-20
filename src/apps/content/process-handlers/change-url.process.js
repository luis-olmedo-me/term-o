export default async (resolve, reject, data) => {
  try {
    const url = new URL(data.url)

    window.location.assign(url)

    resolve(null)
  } catch (error) {
    reject(error?.message || error)
  }
}
