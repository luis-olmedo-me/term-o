const isBetween = (min, max) => {
  return value => {
    const isValid = value >= min && value <= max

    if (!isValid) {
      throw `Expects value between ${min} and ${max}.`
    }
  }
}

export const validate = ([validationKey, ...props], newValue) => {
  switch (validationKey) {
    case 'is-between':
      isBetween(...props)(newValue)
      break
  }
}
