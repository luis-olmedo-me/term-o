export const debounce = (callback, wait) => {
  let timerId

  return (...args) => {
    clearTimeout(timerId)

    timerId = setTimeout(() => callback(...args), wait)
  }
}

export const removeDuplicatedFromArray = (array) => {
  return [...new Set(array)]
}

export const replace = (message, params) => {
  return Object.entries(params).reduce((replacedString, [key, value]) => {
    return replacedString.replace(key, value)
  }, message)
}
