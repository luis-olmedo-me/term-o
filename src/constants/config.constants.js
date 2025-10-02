import { isBetween } from '@src/helpers/validation.helpers'
import { defaultColorTheme } from './themes.constants'

export const configIds = {
  GENERAL: 'general',
  PROMPT: 'prompt',
  APPEARENCE: 'appearence'
}

export const configInputIds = {
  COPY_ON_SELECTION: 'copy-on-selection',
  SWITCH_TAB_AUTOMATICALLY: 'switch-tab-automatically',
  MAX_LINES_PER_COMMAND: 'max-lines-per-command',
  HISTORIAL_SIZE: 'historial-size',
  STATUS: 'status',
  FONT_FAMILY: 'font-family',
  FONT_SIZE: 'font-size',
  THEME_NAME: 'theme-name'
}

export const defaultConfigSections = [
  {
    id: configIds.GENERAL,
    name: 'General',
    description: 'Configure various settings related to the terminal appearance and behavior.',
    inputs: [
      {
        id: configInputIds.COPY_ON_SELECTION,
        name: 'Automatic Copy on Selection',
        description:
          'Automatically copies text to the clipboard when it is selected using the mouse.',
        type: 'boolean',
        postFix: null,
        options: [],
        value: true
      },
      {
        id: configInputIds.SWITCH_TAB_AUTOMATICALLY,
        name: 'Switch Tab Automatically',
        description:
          'Automatically switches to a new tab when it is created or activated. This setting improves workflow efficiency by ensuring that the user is always working in the current tab.',
        type: 'boolean',
        postFix: null,
        options: [],
        value: true
      },
      {
        id: configInputIds.MAX_LINES_PER_COMMAND,
        name: 'Maximum Lines per Command',
        description:
          'Sets the maximum number of lines that a single command can output before scrolling begins.',
        type: 'number',
        postFix: 'px',
        options: [],
        value: 50,
        validation: [isBetween(0, 1000)]
      },
      {
        id: configInputIds.HISTORIAL_SIZE,
        name: 'Command History Size',
        description: 'Defines the number of previous commands to be stored in the command history.',
        type: 'number',
        postFix: 'px',
        options: [],
        value: 40
      }
    ]
  },
  {
    id: configIds.PROMPT,
    name: 'Prompt',
    description:
      'Adjust settings related to the command prompt appearance and information display.',
    inputs: [
      {
        id: configInputIds.STATUS,
        name: 'Prompt Status Label',
        description:
          'Text displayed before the prompt input field, typically used to show dynamic information or context.',
        type: 'string',
        postFix: null,
        options: [],
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
        value: defaultColorTheme.name
      },
      {
        id: configInputIds.FONT_FAMILY,
        name: 'Font Family',
        description: 'Specifies the font family used for displaying text in the terminal.',
        type: 'font-select',
        postFix: null,
        options: [],
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
        value: '16'
      }
    ]
  }
]
