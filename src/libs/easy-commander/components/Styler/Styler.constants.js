import { kebabize, validStyleKeys } from '../../easyCommander.promises'

export const cssProps = validStyleKeys.reduce((props, key) => {
  return {
    ...props,
    [kebabize(key)]: { key, type: 'string', defaultValue: '', aliases: [] }
  }
}, {})
