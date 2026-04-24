import { iconSizes } from '@src/constants/icon.constants'
import { buttonSizes, buttonVariants } from './Button.constants'
import {
  button___size_large,
  button___size_normal,
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

export const getClassNameBySize = variant => {
  if (variant === buttonSizes.NORMAL) return button___size_normal
  if (variant === buttonSizes.LARGE) return button___size_large
  return ''
}

export const getIconSizeBySize = variant => {
  if (variant === buttonSizes.NORMAL) return iconSizes.BUTTON_NORMAL
  if (variant === buttonSizes.LARGE) return iconSizes.BUTTON_LARGE
  return ''
}
