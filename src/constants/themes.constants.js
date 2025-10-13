export const colorThemeKeys = {
  NAME: 'name',
  BACKGROUND: 'background',
  FOREGROUND: 'foreground',
  SELECTION_BACKGROUND: 'selectionBackground',
  BRIGHT_BLACK: 'brightBlack',
  BRIGHT_BLUE: 'brightBlue',
  BRIGHT_CYAN: 'brightCyan',
  BRIGHT_GREEN: 'brightGreen',
  BRIGHT_PURPLE: 'brightPurple',
  BRIGHT_RED: 'brightRed',
  BRIGHT_WHITE: 'brightWhite',
  BRIGHT_YELLOW: 'brightYellow',
  CURSOR_COLOR: 'cursorColor',
  BLACK: 'black',
  BLUE: 'blue',
  CYAN: 'cyan',
  GREEN: 'green',
  PURPLE: 'purple',
  RED: 'red',
  WHITE: 'white',
  YELLOW: 'yellow'
}

export const defaultColorTheme = {
  [colorThemeKeys.NAME]: 'Default Dark Mode',
  [colorThemeKeys.BACKGROUND]: '#121212',
  [colorThemeKeys.FOREGROUND]: '#ECEDEE',
  [colorThemeKeys.SELECTION_BACKGROUND]: '#27272a',
  [colorThemeKeys.BRIGHT_BLACK]: '#A1A1AA',
  [colorThemeKeys.BRIGHT_BLUE]: '#338EF7',
  [colorThemeKeys.BRIGHT_CYAN]: '#A5EEFD',
  [colorThemeKeys.BRIGHT_GREEN]: '#45D483',
  [colorThemeKeys.BRIGHT_PURPLE]: '#9353D3',
  [colorThemeKeys.BRIGHT_RED]: '#F54180',
  [colorThemeKeys.BRIGHT_WHITE]: '#FFFFFF',
  [colorThemeKeys.BRIGHT_YELLOW]: '#FFD369',
  [colorThemeKeys.CURSOR_COLOR]: '#ECEDEE',
  [colorThemeKeys.BLACK]: '#18181B',
  [colorThemeKeys.BLUE]: '#006FEE',
  [colorThemeKeys.CYAN]: '#7EE7FC',
  [colorThemeKeys.GREEN]: '#17C964',
  [colorThemeKeys.PURPLE]: '#7828C8',
  [colorThemeKeys.RED]: '#F31260',
  [colorThemeKeys.WHITE]: '#F4F4F5',
  [colorThemeKeys.YELLOW]: '#F5A524'
}

export const defaultTheme = {
  radius: {
    50: '1px',
    100: '2px',
    150: '3px',
    200: '4px',
    300: '8px',
    400: '10px',
    500: '14px',
    600: '16px'
  },

  space: {
    50: '1px',
    100: '2px',
    150: '3px',
    200: '4px',
    250: '6px',
    300: '8px',
    400: '10px',
    450: '12px',
    500: '14px',
    600: '16px',
    700: '18px',
    800: '20px',
    900: '25px'
  },

  fontSize: {
    50: '.75rem',
    100: '1rem',
    200: '1.25rem',
    300: '1.50rem'
  },

  lineHeight: {
    50: '.8rem',
    100: '1rem',
    200: '1.25rem',
    300: '1.5rem'
  },

  font: {
    primary: 'Consolas'
  }
}

export const basicColorKeys = [
  colorThemeKeys.BLUE,
  colorThemeKeys.CYAN,
  colorThemeKeys.GREEN,
  colorThemeKeys.PURPLE,
  colorThemeKeys.RED,
  colorThemeKeys.YELLOW
]

export const brightColorKeys = [
  colorThemeKeys.BRIGHT_BLUE,
  colorThemeKeys.BRIGHT_CYAN,
  colorThemeKeys.BRIGHT_GREEN,
  colorThemeKeys.BRIGHT_PURPLE,
  colorThemeKeys.BRIGHT_RED,
  colorThemeKeys.BRIGHT_YELLOW
]

export const onlyColorKeys = [...basicColorKeys, ...brightColorKeys]
