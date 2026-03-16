import { buttonVariants } from './Button.constants'
import {
  button___variant_outlined,
  button___variant_outlined_danger,
  button___variant_outlined_warn
} from './Button.module.scss'

export const getClassNameByVariant = variant => {
  if (variant === buttonVariants.OUTLINED) return button___variant_outlined
  if (variant === buttonVariants.OUTLINED_DANGER) return button___variant_outlined_danger
  if (variant === buttonVariants.OUTLINED_WARN) return button___variant_outlined_warn
  return ''
}
