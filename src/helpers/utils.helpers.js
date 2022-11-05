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

export const generateUUID = () => {
  let numberRounded = new Date().getTime()

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (character) => {
      const randomNumber = (numberRounded + Math.random() * 16) % 16 | 0
      numberRounded = Math.floor(numberRounded / 16)

      const randomizedString =
        character == 'x' ? randomNumber : (randomNumber & 0x3) | 0x8

      return randomizedString.toString(16)
    }
  )
  return uuid
}
