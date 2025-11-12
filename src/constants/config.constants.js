import Data from '@src/icons/Data.icon'
import Palette from '@src/icons/Palette.icon'
import Thunder from '@src/icons/Thunder.icon'
import { availableInputTypes } from './inputs.constants'
import { basicColorKeys, colorThemeKeys, defaultColorTheme } from './themes.constants'

export const PROMPT_MARK = '$'

export const configIds = {
  FUNCTIONALITY: 'functionality',
  APPEARENCE: 'appearence',
  DATA: 'data'
}

export const configInputIds = {
  COPY_ON_SELECTION: 'copy-on-selection',
  SWITCH_TAB_AUTOMATICALLY: 'switch-tab-automatically',
  MAX_LINES_PER_COMMAND: 'max-lines-per-command',
  HISTORIAL_SIZE: 'historial-size',
  CONTEXT: 'status',
  FONT_FAMILY: 'font-family',
  FONT_SIZE: 'font-size',
  THEME_NAME: 'theme-name',
  COLOR_ACCENT: 'color-accent',
  RESET_DATA: 'reset-data',
  STATUS_INDICATOR: 'status-indicator',
  STATUS_BAR: 'status-bar',
  STATUS_LIGHT: 'status-light'
}

export const fontSizes = {
  EXTRA_SMALL: '12',
  SMALL: '14',
  NORMAL: '16',
  LARGE: '18'
}

export const statusIndicators = {
  DOT: 'dot',
  HALF_DOT: 'half-dot',
  NONE: 'none'
}

export const configDefaultValues = {
  [configInputIds.COPY_ON_SELECTION]: true,
  [configInputIds.SWITCH_TAB_AUTOMATICALLY]: true,
  [configInputIds.MAX_LINES_PER_COMMAND]: 50,
  [configInputIds.HISTORIAL_SIZE]: 40,
  [configInputIds.CONTEXT]: 'On [termo.color.brightBlue]{origin}',
  [configInputIds.FONT_FAMILY]: 'Consolas',
  [configInputIds.FONT_SIZE]: fontSizes.NORMAL,
  [configInputIds.THEME_NAME]: defaultColorTheme.name,
  [configInputIds.COLOR_ACCENT]: colorThemeKeys.GREEN,
  [configInputIds.RESET_DATA]: 'Reset',
  [configInputIds.STATUS_INDICATOR]: statusIndicators.DOT,
  [configInputIds.STATUS_BAR]: true,
  [configInputIds.STATUS_LIGHT]: true
}

export const defaultConfigSections = [
  {
    id: configIds.FUNCTIONALITY,
    name: 'Functionality',
    description: 'Adjust how the terminal behaves and interacts with the browser.',
    Icon: Thunder,
    inputs: [
      {
        id: configInputIds.COPY_ON_SELECTION,
        name: 'Auto-copy selected text',
        description: 'Automatically copy highlighted text to the clipboard.',
        type: availableInputTypes.BOOLEAN,
        postFix: null,
        options: [],
        validations: [],
        value: configDefaultValues[configInputIds.COPY_ON_SELECTION]
      },
      {
        id: configInputIds.SWITCH_TAB_AUTOMATICALLY,
        name: 'Sync terminal tab with UI tab change',
        description:
          'When switching or opening tabs in the browser, the terminal pointer updates to follow the active tab.',
        type: availableInputTypes.BOOLEAN,
        postFix: null,
        options: [],
        validations: [],
        value: configDefaultValues[configInputIds.SWITCH_TAB_AUTOMATICALLY]
      },
      {
        id: configInputIds.MAX_LINES_PER_COMMAND,
        name: 'Max visible lines in terminal',
        description:
          'Define how many lines are displayed in the terminal before older ones are trimmed.',
        type: availableInputTypes.NUMBER,
        postFix: 'px',
        options: [],
        validations: [['is-between', 0, 1000]],
        value: configDefaultValues[configInputIds.MAX_LINES_PER_COMMAND]
      },
      {
        id: configInputIds.HISTORIAL_SIZE,
        name: 'Max command history size',
        description: 'Define how many commands will be remembered.',
        type: availableInputTypes.NUMBER,
        postFix: 'px',
        options: [],
        validations: [['is-between', 0, 1000]],
        value: configDefaultValues[configInputIds.HISTORIAL_SIZE]
      },
      {
        id: configInputIds.STATUS_INDICATOR,
        name: 'Status indicator',
        description: 'Defines how the status indicator is shown in the terminal prompt.',
        type: availableInputTypes.SELECT,
        postFix: null,
        options: [
          { id: statusIndicators.DOT, name: 'Dot' },
          { id: statusIndicators.HALF_DOT, name: 'Half Dot' },
          { id: statusIndicators.NONE, name: 'None' }
        ],
        validations: [],
        value: configDefaultValues[configInputIds.STATUS_INDICATOR]
      },
      {
        id: configInputIds.CONTEXT,
        name: 'Prompt Context',
        description:
          'Define a custom text to be displayed in the terminal prompt as context information.',
        type: availableInputTypes.TEXT_AREA,
        postFix: null,
        options: [],
        validations: [],
        value: configDefaultValues[configInputIds.CONTEXT]
      }
    ]
  },
  {
    id: configIds.APPEARENCE,
    name: 'Appearence',
    description: 'Customize the visual appearance of the terminal, including font settings.',
    Icon: Palette,
    inputs: [
      {
        id: configInputIds.THEME_NAME,
        name: 'Theme',
        description: 'Prefered theme in color schemes.',
        type: availableInputTypes.THEME_SELECT,
        postFix: null,
        options: [],
        validations: [],
        value: configDefaultValues[configInputIds.THEME_NAME]
      },
      {
        id: configInputIds.COLOR_ACCENT,
        name: 'Accent Color',
        description: 'Select the primary accent color used in the interface.',
        type: availableInputTypes.COLOR_SELECT,
        postFix: null,
        options: basicColorKeys.map(key => ({ id: key, name: key })),
        validations: [],
        value: configDefaultValues[configInputIds.COLOR_ACCENT]
      },
      {
        id: configInputIds.FONT_FAMILY,
        name: 'Font Family',
        description: 'Specifies the font family used for displaying text in the terminal.',
        type: availableInputTypes.FONT_SELECT,
        postFix: null,
        options: [],
        validations: [],
        value: configDefaultValues[configInputIds.FONT_FAMILY]
      },
      {
        id: configInputIds.FONT_SIZE,
        name: 'Font Size',
        description: 'Defines the size of the font used in the terminal.',
        type: availableInputTypes.SELECT,
        postFix: null,
        options: [
          { id: fontSizes.EXTRA_SMALL, name: 'Extra-Small' },
          { id: fontSizes.SMALL, name: 'Small' },
          { id: fontSizes.NORMAL, name: 'Normal' },
          { id: fontSizes.LARGE, name: 'Large' }
        ],
        validations: [],
        value: configDefaultValues[configInputIds.FONT_SIZE]
      },
      {
        id: configInputIds.STATUS_BAR,
        name: 'Status bar',
        description: 'Display the status bar in the terminal prompt.',
        type: availableInputTypes.BOOLEAN,
        postFix: null,
        options: [],
        validations: [],
        value: configDefaultValues[configInputIds.STATUS_BAR]
      },
      {
        id: configInputIds.STATUS_LIGHT,
        name: 'Status light',
        description: 'Display the status light in the terminal prompt.',
        type: availableInputTypes.BOOLEAN,
        postFix: null,
        options: [],
        validations: [],
        value: configDefaultValues[configInputIds.STATUS_LIGHT]
      }
    ]
  },
  {
    id: configIds.DATA,
    name: 'Data',
    description: 'Manage storage and configuration backups.',
    Icon: Data,
    inputs: [
      {
        id: configInputIds.RESET_DATA,
        name: 'Restore factory defaults',
        description: 'Reset all settings to their original factory values.',
        type: availableInputTypes.BUTTON,
        postFix: null,
        options: [],
        validations: [],
        value: configDefaultValues[configInputIds.RESET_DATA]
      }
    ]
  }
]

export const defaultConfig = defaultConfigSections.reduce((simplifiedConfig, section) => {
  const sectionInputValues = section.inputs.reduce(
    (simplifiedInputs, input) => ({ ...simplifiedInputs, [input.id]: input.value }),
    {}
  )

  return {
    ...simplifiedConfig,
    ...sectionInputValues
  }
}, {})
