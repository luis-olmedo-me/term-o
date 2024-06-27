export const getCookies = () => {
  if (!document.cookie) return {}

  return document.cookie.split('; ').reduce((parsedCookies, cookie) => {
    const [key, value] = cookie.split('=')

    return { ...parsedCookies, [key]: value }
  }, {})
}

export const getStorage = (resolve, data) => {
  let storages = {}

  if (data.includeLocal) storages = { ...storages, local: { ...window.localStorage } }
  if (data.includeSession) storages = { ...storages, session: { ...window.localStorage } }
  if (data.includeCookies) storages = { ...storages, cookies: getCookies() }

  resolve(storages)
}
