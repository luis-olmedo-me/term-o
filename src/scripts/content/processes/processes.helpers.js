export const silentQuotes = object => {
  return Object.keys(object).reduce((newObject, key) => {
    const value = object[key] || ''

    return { ...newObject, [key]: value.replace(/"/g, '\\"') }
  }, {})
}
