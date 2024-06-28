export const getCookies = () => {
  if (!document.cookie) return {}

  return document.cookie.split('; ').reduce((parsedCookies, cookie) => {
    const [key, value] = cookie.split('=')

    return { ...parsedCookies, [key]: value }
  }, {})
}

function silentQuotes(storageObject) {
  return Object.keys(storageObject).reduce((newStorageObject, key) => {
    newStorageObject[key] = storageObject[key].replace(/"/g, '\\"')

    return newStorageObject
  }, {})
}

export const getStorage = (resolve, data) => {
  let storages = {}

  if (data.includeLocal) storages = { ...storages, local: silentQuotes(window.localStorage) }
  if (data.includeSession) storages = { ...storages, session: silentQuotes(window.sessionStorage) }
  if (data.includeCookies) storages = { ...storages, cookies: silentQuotes(getCookies()) }

  resolve(storages)
}
