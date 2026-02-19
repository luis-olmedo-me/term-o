export default async (resolve, reject, data) => {
  try {
    const requestEvent = new CustomEvent('term-o-request-send', { detail: data })
    const handleRequestSolved = event => {
      window.removeEventListener('term-o-request-solved', handleRequestSolved)
      resolve(event.detail)
    }

    window.addEventListener('term-o-request-solved', handleRequestSolved)

    window.dispatchEvent(requestEvent)
  } catch (error) {
    reject('Unexpected error when trying to request input.')
  }
}
