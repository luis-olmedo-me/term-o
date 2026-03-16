import { caretShapes } from '@src/constants/config.constants'
import {
  provider__inputs_caret_bar,
  provider__inputs_caret_block,
  provider__inputs_caret_underscore
} from './ThemeProvider.module.scss'

export const getClassNameByInputsCaret = caret => {
  if (caret === caretShapes.BAR) return provider__inputs_caret_bar
  if (caret === caretShapes.BLOCK) return provider__inputs_caret_block
  if (caret === caretShapes.UNDERSCORE) return provider__inputs_caret_underscore
}
