export const createPSO = (value, tab) => {
  const url = tab && new URL(tab.url)

  const origin = url?.origin || ''
  const pathname = url?.pathname || ''

  return value.replace('{origin}', origin).replace('{pathname}', pathname)
}
