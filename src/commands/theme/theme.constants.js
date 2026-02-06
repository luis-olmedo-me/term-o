import { colorThemeKeys } from '@src/constants/themes.constants'
import { schemaTypes } from '@src/constants/validation-schema.constants'

export const colorScheme = {
  [colorThemeKeys.NAME]: schemaTypes.STRING,
  [colorThemeKeys.BLACK]: schemaTypes.STRING,
  [colorThemeKeys.RED]: schemaTypes.STRING,
  [colorThemeKeys.GREEN]: schemaTypes.STRING,
  [colorThemeKeys.YELLOW]: schemaTypes.STRING,
  [colorThemeKeys.BLUE]: schemaTypes.STRING,
  [colorThemeKeys.PURPLE]: schemaTypes.STRING,
  [colorThemeKeys.CYAN]: schemaTypes.STRING,
  [colorThemeKeys.WHITE]: schemaTypes.STRING,
  [colorThemeKeys.BRIGHT_BLACK]: schemaTypes.STRING,
  [colorThemeKeys.BRIGHT_RED]: schemaTypes.STRING,
  [colorThemeKeys.BRIGHT_GREEN]: schemaTypes.STRING,
  [colorThemeKeys.BRIGHT_YELLOW]: schemaTypes.STRING,
  [colorThemeKeys.BRIGHT_BLUE]: schemaTypes.STRING,
  [colorThemeKeys.BRIGHT_PURPLE]: schemaTypes.STRING,
  [colorThemeKeys.BRIGHT_CYAN]: schemaTypes.STRING,
  [colorThemeKeys.BRIGHT_WHITE]: schemaTypes.STRING,
  [colorThemeKeys.BACKGROUND]: schemaTypes.STRING,
  [colorThemeKeys.FOREGROUND]: schemaTypes.STRING,
  [colorThemeKeys.SELECTION_BACKGROUND]: schemaTypes.STRING,
  [colorThemeKeys.CURSOR_COLOR]: schemaTypes.STRING
}

export const themeHelpSections = {
  MANAGEMENT: 'Management',
  APPLICATION: 'Application'
}
