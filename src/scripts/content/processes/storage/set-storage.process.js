export const setStorage = async (resolve, data) => {
  let { namespace, key, value } = data

  switch (namespace) {
    case 'local':
      window.localStorage.setItem(key, value)
      break
    case 'session':
      window.sessionStorage.setItem(key, value)
      break
    case 'cookie':
      document.cookie = `${key}=${value}`
      break
  }

  resolve({ [key]: value })
}
