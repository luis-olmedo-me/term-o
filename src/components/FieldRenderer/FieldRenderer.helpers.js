import { availableInputTypes } from '@src/constants/inputs.constants'
import {
  field__input___width_fit,
  field__input___width_full,
  field__input___width_static
} from './FieldRenderer.module.scss'

export const getClassNameByType = type => {
  if (type === availableInputTypes.BOOLEAN) return field__input___width_fit
  if (type === availableInputTypes.BUTTON) return field__input___width_fit
  if (type === availableInputTypes.BUTTON_DANGER) return field__input___width_fit
  if (type === availableInputTypes.BUTTON_WARN) return field__input___width_fit

  if (type === availableInputTypes.COLOR_SELECT) return field__input___width_static
  if (type === availableInputTypes.FONT_SELECT) return field__input___width_static
  if (type === availableInputTypes.SELECT) return field__input___width_static
  if (type === availableInputTypes.NUMBER) return field__input___width_static
  if (type === availableInputTypes.STRING) return field__input___width_static
  if (type === availableInputTypes.THEME_SELECT) return field__input___width_static
  if (type === availableInputTypes.TYPED_SELECT) return field__input___width_static

  if (type === availableInputTypes.TEXT_AREA) return field__input___width_full
  return ''
}
