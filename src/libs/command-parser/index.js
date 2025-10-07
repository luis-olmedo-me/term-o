import { commandNames } from './command-parser.constants'
import { limitSimplifiedCommands, updateSimplifiedCommandsWith } from './command-parser.helpers'
import { commandParser } from './command-parser.service'

export default commandParser

export { commandNames, limitSimplifiedCommands, updateSimplifiedCommandsWith }
