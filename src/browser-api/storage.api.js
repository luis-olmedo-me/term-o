export const getStorageValue = async (namespace, key, defaultValue = null) => {
  const storage = await chrome.storage[namespace].get(key)
  const value = storage[key]
  const hasValue = typeof value !== 'undefined'

  return hasValue ? value : defaultValue
}

export const setStorageValue = (namespace, key, value) => {
  return chrome.storage[namespace].set({ [key]: value })
}

export const deleteStorageValue = (namespace, key) => {
  return chrome.storage[namespace].remove([key])
}
