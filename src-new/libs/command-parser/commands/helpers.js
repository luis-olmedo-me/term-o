export const isRegExp = value => {
  try {
    new RegExp(value)
  } catch (error) {
    throw `${value} is not a valid regular expression.`
  }
}

export const isURL = value => {
  try {
    new URL(value)
  } catch (error) {
    throw `${value} is not a valid URL.`
  }
}
