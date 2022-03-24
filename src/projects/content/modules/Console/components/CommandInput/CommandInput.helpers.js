export const splice = (myString, index, value) => {
  return myString.slice(0, index) + value + myString.slice(index)
}

export const spliceArg = (myString, index, value) => {
  let words = myString.split(' ')
  let letterCounter = 0

  if (myString.length === index) {
    words[words.length - 1] = value

    return words.join(' ')
  }

  for (const wordIndex in words) {
    const word = words[wordIndex]
    letterCounter += word.length + 1

    if (letterCounter >= index) {
      words[wordIndex] = value
      break
    }
  }

  return words.join(' ')
}
