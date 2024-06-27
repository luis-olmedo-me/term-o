export const getCookies = () => {
  if (!document.cookie) return {}

  return document.cookie.split('; ').reduce((parsedCookies, cookie) => {
    const [key, value] = cookie.split('=')

    return { ...parsedCookies, [key]: value }
  }, {})
}

export const getStorage = (resolve, data) => {
  let storages = {}

  if (data.inludeLocal) storages = { ...storages, ...window.localStorage }
  if (data.includeSession) storages = { ...storages, ...window.sessionStorage }
  if (data.includeCookies) storages = { ...storages, ...getCookies() }

  resolve(formattedElements)
}
