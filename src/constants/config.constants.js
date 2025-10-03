import { defaultColorTheme } from './themes.constants'

export const configIds = {
  FUNCTIONALITY: 'general',
  APPEARENCE: 'appearence'
}

export const configInputIds = {
  COPY_ON_SELECTION: 'copy-on-selection',
  SWITCH_TAB_AUTOMATICALLY: 'switch-tab-automatically',
  MAX_LINES_PER_COMMAND: 'max-lines-per-command',
  HISTORIAL_SIZE: 'historial-size',
  CONTEXT: 'status',
  FONT_FAMILY: 'font-family',
  FONT_SIZE: 'font-size',
  THEME_NAME: 'theme-name'
}

export const defaultConfigSections = [
  {
    id: configIds.FUNCTIONALITY,
    name: 'General',
    description: 'Adjust how the terminal behaves and interacts with the browser.',
    inputs: [
      {
        id: configInputIds.COPY_ON_SELECTION,
        name: 'Auto-copy selected text',
        description: 'Automatically copy highlighted text to the clipboard.',
        type: 'boolean',
        postFix: null,
        options: [],
        validations: [],
        value: true
      },
      {
        id: configInputIds.SWITCH_TAB_AUTOMATICALLY,
        name: 'Sync terminal tab with UI tab change',
        description:
          'When switching or opening tabs in the browser, the terminal pointer updates to follow the active tab.',
        type: 'boolean',
        postFix: null,
        options: [],
        validations: [],
        value: true
      },
      {
        id: configInputIds.MAX_LINES_PER_COMMAND,
        name: 'Max visible lines in terminal',
        description:
          'Define how many lines are displayed in the terminal before older ones are trimmed.',
        type: 'number',
        postFix: 'px',
        options: [],
        validations: [['is-between', 0, 1000]],
        value: 50
      },
      {
        id: configInputIds.HISTORIAL_SIZE,
        name: 'Max command history size',
        description: 'Define how many commands will be remembered.',
        type: 'number',
        postFix: 'px',
        options: [],
        validations: [['is-between', 0, 1000]],
        value: 40
      },
      {
        id: configInputIds.CONTEXT,
        name: 'Prompt Context',
        description:
          'Define a custom text to be displayed in the terminal prompt as context information.',
        type: 'string',
        postFix: null,
        options: [],
        validations: [],
        value: `On [termo.color.brightBlue]{origin}`
      }
    ]
  },
  {
    id: configIds.APPEARENCE,
    name: 'Appearence',
    description: 'Customize the visual appearance of the terminal, including font settings.',
    inputs: [
      {
        id: configInputIds.THEME_NAME,
        name: 'Theme',
        description: 'Prefered theme in color schemes.',
        type: 'theme-select',
        postFix: null,
        options: [],
        validations: [],
        value: defaultColorTheme.name
      },
      {
        id: configInputIds.FONT_FAMILY,
        name: 'Font Family',
        description: 'Specifies the font family used for displaying text in the terminal.',
        type: 'font-select',
        postFix: null,
        options: [],
        validations: [],
        value: 'Consolas'
      },
      {
        id: configInputIds.FONT_SIZE,
        name: 'Font Size',
        description: 'Defines the size of the font used in the terminal.',
        type: 'select',
        postFix: null,
        options: [
          { id: '12', name: 'Extra-Small' },
          { id: '14', name: 'Small' },
          { id: '16', name: 'Normal' },
          { id: '18', name: 'Large' }
        ],
        validations: [],
        value: '16'
      }
    ]
  }
]
