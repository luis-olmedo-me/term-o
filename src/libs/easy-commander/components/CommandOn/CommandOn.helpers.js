export const checkIfRegExpIsValid = (regExp) => {
  try {
    new RegExp(regExp)
    return true
  } catch (error) {
    return false
  }
}
