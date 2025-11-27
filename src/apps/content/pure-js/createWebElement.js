export const createWebElement = (name, props) => {
  const host = document.createElement(name)

  Object.entries(props).forEach(([propName, propValue]) => {
    host.setAttribute(propName, propValue)
  })

  return host
}
