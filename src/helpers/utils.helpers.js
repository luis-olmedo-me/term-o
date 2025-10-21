const rgbStartPattern = /\brgba?\(/
const rgbPattern = /rgba?\([^)]+\)/g

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

export const delay = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}

export const getQuotedString = value => {
  const hasDoubleQuote = value.includes('"')
  const hasSingleQuote = value.includes("'")

  if (hasDoubleQuote && !hasSingleQuote) return `'${value}'`
  else if (!hasDoubleQuote && hasSingleQuote) return `"${value}"`
  else return `"${value.replace('"', '\\"')}"`
}

export const spreadIf = (condition, value) => {
  return condition ? value : {}
}

const rgbToHexByFragment = rgb => {
  const nums = rgb.match(/\d+(\.\d+)?/g).map(Number)
  const [r, g, b, a, ...rest] = nums

  if (rest.length) return rgb

  if (a === undefined || a === 1) {
    return (
      '#' +
      [r, g, b]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()
    )
  }

  const alpha = Math.round(a * 255)
  return (
    '#' +
    [r, g, b, alpha]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  )
}
export const rgbToHex = value => {
  return value.replace(rgbPattern, rgbToHexByFragment)
}

export const isRgb = value => rgbStartPattern.test(value)
