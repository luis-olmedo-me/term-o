export const insertInArray = (array, matches) => {
  return array.reduce((accumlator, item, index) => {
    const match = matches[index]

    return match ? [...accumlator, item, match] : [...accumlator, item]
  }, [])
}
