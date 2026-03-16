import { inputVariants } from './Input.constants'
import { input__real_input___variant_outlined } from './Input.module.scss'

export const getClassNameByVariant = variant => {
  if (variant === inputVariants.OUTLINED) return input__real_input___variant_outlined
  return ''
}
