import { camelize } from '../../easyCommander.promises'

export const parseStyles = (inlineStyles) => {
  const regex = /([\w-]*)\s*:\s*([^;]*)/g
  var match,
    properties = {}

  while ((match = regex.exec(inlineStyles))) {
    const [, key, value] = match

    properties[camelize(key)] = value.trim()
  }

  return properties
}
