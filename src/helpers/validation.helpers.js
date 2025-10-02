export const isBetween = (min, max) => {
  return value => {
    const isValid = value >= min && value <= max

    if (!isValid) {
      throw `Expects value between ${min} and ${max}.`
    }
  }
}
