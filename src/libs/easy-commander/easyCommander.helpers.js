import commandParser from 'minimist'

export const parseArgsIntoCommands = (args) => {
  const line = args.join(' ').replace(/".+"/g, encodeURI).split(' ')
  const object = commandParser(line)

  return Object.entries(object).reduce((parsedObject, [key, value]) => {
    const isValueString = typeof value === 'string'

    return {
      ...parsedObject,
      [key]: isValueString ? decodeURI(value).replace(/^"|"$/g, '') : value
    }
  }, {})
}
