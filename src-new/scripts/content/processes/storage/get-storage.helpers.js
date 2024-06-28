import { silentQuotes } from '../processes.helpers'

export const getCookies = () => {
  if (!document.cookie) return {}

  const cookies = document.cookie.split('; ').reduce((parsedCookies, cookie) => {
    const [key, value] = cookie.split('=')

    return { ...parsedCookies, [key]: value }
  }, {})

  return silentQuotes(cookies)
}

export const getSession = () => silentQuotes({ ...sessionStorage })

export const getLocal = () => silentQuotes({ ...localStorage })
