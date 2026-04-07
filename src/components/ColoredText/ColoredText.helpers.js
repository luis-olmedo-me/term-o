import { paintedBorderTypes } from '@src/constants/paint.constants'
import {
  text___both_colored,
  text___next_colored,
  text___previous_colored,
  text___unique_colored
} from './ColoredText.module.scss'

export const getClassByBorderType = borderType => {
  if (borderType === paintedBorderTypes.BOTH_COLORED) return text___both_colored
  if (borderType === paintedBorderTypes.PREVIOUS_COLORED) return text___previous_colored
  if (borderType === paintedBorderTypes.NEXT_COLORED) return text___next_colored
  if (borderType === paintedBorderTypes.UNIQUE_COLORED) return text___unique_colored
  return ''
}
