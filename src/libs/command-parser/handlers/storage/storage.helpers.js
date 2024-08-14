export const getStorageValue = async (namespace, key) => {
  const storage = await chrome.storage[namespace].get(key)
  const value = storage[key]
  const hasValue = typeof value !== 'undefined'

  return hasValue ? value : null
}

export const setStorageValue = (namespace, key, value) => {
  return chrome.storage[namespace].set({ [key]: value })
}

export const getStorageNamespace = (includeLocal, includeSession, includeCookies) => {
  return (
    (includeLocal && 'local') ||
    (includeSession && 'session') ||
    (includeCookies && 'cookie') ||
    null
  )
}
