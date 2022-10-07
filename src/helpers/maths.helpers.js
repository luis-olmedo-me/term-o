export const setDigits = (number, digits) => {
  const numberAsString = number.toString()
  const leftZerosNeeded = digits - numberAsString.length
  const leftZeros = '0'.repeat(leftZerosNeeded)

  return `${leftZeros}${numberAsString}`
}
