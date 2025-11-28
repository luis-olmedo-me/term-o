export const getCookies = () => {
  if (!document.cookie) return {}

  const cookies = document.cookie.split('; ').reduce((parsedCookies, cookie) => {
    const [key, value] = cookie.split('=')

    return { ...parsedCookies, [key]: value }
  }, {})

  return cookies
}
