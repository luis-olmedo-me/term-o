import { compressToUTF16, decompressFromUTF16 } from 'lz-string'

export const getStorageValue = async (namespace, key, defaultValue = null, isJSON) => {
  const storage = await chrome.storage[namespace].get(key)
  const value = storage[key]
  const hasValue = typeof value === 'string'

  if (hasValue) {
    const valueDecompressed = decompressFromUTF16(value)
    const valueSet = isJSON ? JSON.parse(valueDecompressed) : valueDecompressed

    return valueSet
  }

  return defaultValue
}

export const setStorageValue = (namespace, key, value, isJSON) => {
  const valueJson = isJSON ? JSON.stringify(value) : value
  const valueSet = valueJson !== null ? compressToUTF16(valueJson) : valueJson

  return chrome.storage[namespace].set({ [key]: valueSet })
}

export const deleteStorageValue = (namespace, key) => {
  return chrome.storage[namespace].remove([key])
}
