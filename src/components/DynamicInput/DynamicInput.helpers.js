import { availableInputTypes } from '@src/constants/inputs.constants'
import { buttonVariants } from '../Button'

export const getButtonVariantFromType = type => {
  if (type === availableInputTypes.BUTTON) return buttonVariants.OUTLINED
  if (type === availableInputTypes.BUTTON_WARN) return buttonVariants.OUTLINED_WARN
  if (type === availableInputTypes.BUTTON_DANGER) return buttonVariants.OUTLINED_DANGER
  return buttonVariants.GHOST
}
