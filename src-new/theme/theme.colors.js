import colorSets from '@src/libs/color-sets'

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

  fontSize: {
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
  }
}

export const themeColorSetNameRef = {
  current: window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? defaultlDarkMode.name
    : defaultlLightMode.name
}
export const themeColorSetsRef = {
  current: defaultTheme.colorsets
}
