export const debounce = (callback, wait) => {
  let timerId

  return (...args) => {
    clearTimeout(timerId)

    timerId = setTimeout(() => callback(...args), wait)
  }
}

export const createUUIDv4 = () => {
  const uuidTemplate = '10000000-1000-4000-8000-100000000000'

  return uuidTemplate.replace(/[018]/g, character => {
    const randomValue = crypto.getRandomValues(new Uint8Array(1))[0]
    const newValue = character === '0' ? randomValue & 0x0f : (randomValue & 0x3) | 0x8

    return newValue.toString(16)
  })
}

export const isRegExp = regExp => {
  try {
    new RegExp(regExp)

    return true
  } catch (error) {
    return false
  }
}
