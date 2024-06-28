export const getCookies = () => {
  if (!document.cookie) return {}

  return document.cookie.split('; ').reduce((parsedCookies, cookie) => {
    const [key, value] = cookie.split('=')

    return { ...parsedCookies, [key]: value }
  }, {})
}
