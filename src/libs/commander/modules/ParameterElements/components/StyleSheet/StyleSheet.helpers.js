export const isValidColor = (string) => {
  const temporalElement = document.createElement('div')

  temporalElement.style.color = string

  return Boolean(temporalElement.style.color)
}
