export const defaultTheme = {
  radius: {
    50: '1px',
    100: '2px',
    200: '4px',
    300: '8px',
    400: '10px',
    500: '14px',
    500: '16px'
  },

  space: {
    50: '1px',
    100: '2px',
    200: '4px',
    300: '8px',
    400: '10px',
    500: '14px',
    500: '16px'
  },

  'font-size': {
    50: '.8rem',
    100: '1rem',
    200: '1.25rem'
  },

  'line-height': {
    50: '.8rem',
    100: '1rem',
    200: '1.25rem',
    300: '1.5rem'
  },

  font: {
    primary: 'Coda'
  },

  colorsets: [
    {
      name: 'Material Black',
      background: '#151515',
      foreground: '#CCCCCC',
      selectionBackground: '#252525',
      brightBlack: '#A1B0B8',
      brightBlue: '#6699CC',
      brightCyan: '#5FB3B3',
      brightGreen: '#99C794',
      brightPurple: '#D81B60',
      brightRed: '#EC5F67',
      brightWhite: '#D8DEE9',
      brightYellow: '#FAC863',
      cursorColor: '#FFFFFF',
      black: '#252525',
      blue: '#42A5F5',
      cyan: '#00ACC1',
      green: '#C3D82C',
      purple: '#C594C5',
      red: '#FF443E',
      white: '#F5F5F5',
      yellow: '#FFC135'
    },
    {
      name: 'Iceberg Light',
      black: '#dcdfe7',
      red: '#cc517a',
      green: '#668e3d',
      yellow: '#c57339',
      blue: '#2d539e',
      purple: '#7759b4',
      cyan: '#3f83a6',
      white: '#33374c',
      brightBlack: '#8389a3',
      brightRed: '#cc3768',
      brightGreen: '#598030',
      brightYellow: '#b6662d',
      brightBlue: '#22478e',
      brightPurple: '#6845ad',
      brightCyan: '#327698',
      brightWhite: '#262a3f',
      background: '#e8e9ec',
      foreground: '#33374c',
      selectionBackground: '#33374c',
      cursorColor: '#33374c'
    }
  ]
}

export const defaultColorSetNames = defaultTheme.colorsets.map(set => set.name)

export const themeColorSetNameRef = {
  current: window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'Material Black'
    : 'Iceberg Light'
}

export const colorScheme = {
  name: 'string',
  black: 'string',
  red: 'string',
  green: 'string',
  yellow: 'string',
  blue: 'string',
  purple: 'string',
  cyan: 'string',
  white: 'string',
  brightBlack: 'string',
  brightRed: 'string',
  brightGreen: 'string',
  brightYellow: 'string',
  brightBlue: 'string',
  brightPurple: 'string',
  brightCyan: 'string',
  brightWhite: 'string',
  background: 'string',
  foreground: 'string',
  selectionBackground: 'string',
  cursorColor: 'string'
}
