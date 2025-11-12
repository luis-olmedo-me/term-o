import { commandTypes } from './command.constants'

export const optionDefaultValues = {
  [commandTypes.STRING_ARRAY]: [],
  [commandTypes.STRING]: '',
  [commandTypes.BOOLEAN]: false,
  [commandTypes.NUMBER]: 0,
  [commandTypes.NONE]: null
}
