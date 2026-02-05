export const toTitleCase = value => {
  return value.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  )
}

export const insert = (value, index, insertion) => {
  return `${value.slice(0, index)}${insertion}${value.slice(index)}`
}
