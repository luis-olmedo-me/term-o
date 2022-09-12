export const spliceArg = (myString, index, value, callback) => {
  let words = myString.split(' ')
  let letterCounter = 0

  if (myString.length === index) {
    const newWord = words.at(-1).replace(/[^"']+/g, value)

    words[words.length - 1] = newWord

    return words.join(' ')
  }

  for (const wordIndex in words) {
    const word = words[wordIndex]
    const currentWordLength = word.length + 1
    letterCounter += currentWordLength

    if (letterCounter >= index) {
      const newWord = words.at(wordIndex).replace(/[^"']+/g, value)

      words[wordIndex] = newWord

      letterCounter += newWord.length - currentWordLength
      break
    }
  }

  if (callback) callback(letterCounter)

  return words.join(' ')
}
