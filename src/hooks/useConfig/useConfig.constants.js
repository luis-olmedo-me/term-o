export const configIds = {
  GENERAL: 'general',
  PROMPT: 'prompt',
  APPEARENCE: 'appearence'
}

export const configInputIds = {
  FOCUS_PROMPT_ON_CLICK: 'focus-prompt-on-click',
  COPY_ON_SELECTION: 'copy-on-selection',
  SWITCH_TAB_AUTOMATICALLY: 'switch-tab-automatically',
  MAX_LINES_PER_COMMAND: 'max-lines-per-command',
  HISTORIAL_SIZE: 'historial-size',
  STATUS: 'status',
  FONT_FAMILY: 'font-family',
  FONT_SIZE: 'font-size',
  THEME: 'theme'
}

export const configSections = [
  {
    id: configIds.GENERAL,
    name: 'General',
    description: 'Configure various settings related to the terminal appearance and behavior.',
    inputs: [
      {
        id: configInputIds.FOCUS_PROMPT_ON_CLICK,
        name: 'Focus Prompt on Click',
        description:
          'Automatically brings the prompt input field into focus when it is clicked with the mouse. This helps streamline user input by ensuring the prompt is active without needing additional key presses.',
        type: 'boolean',
        value: true
      },
      {
        id: configInputIds.COPY_ON_SELECTION,
        name: 'Automatic Copy on Selection',
        description:
          'Automatically copies text to the clipboard when it is selected using the mouse.',
        type: 'boolean',
        value: true
      },
      {
        id: configInputIds.SWITCH_TAB_AUTOMATICALLY,
        name: 'Switch Tab Automatically',
        description:
          'Automatically switches to a new tab when it is created or activated. This setting improves workflow efficiency by ensuring that the user is always working in the current tab.',
        type: 'boolean',
        value: true
      },
      {
        id: configInputIds.MAX_LINES_PER_COMMAND,
        name: 'Maximum Lines per Command',
        description:
          'Sets the maximum number of lines that a single command can output before scrolling begins.',
        type: 'number',
        value: 50
      },
      {
        id: configInputIds.HISTORIAL_SIZE,
        name: 'Command History Size',
        description: 'Defines the number of previous commands to be stored in the command history.',
        type: 'number',
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
        id: configInputIds.THEME,
        name: 'Theme',
        description: 'Theme used.',
        type: 'string',
        value: 'dark'
      },
      {
        id: configInputIds.FONT_FAMILY,
        name: 'Font Family',
        description: 'Specifies the font family used for displaying text in the terminal.',
        type: 'string',
        value: 'monospace'
      },
      {
        id: configInputIds.FONT_SIZE,
        name: 'Font Size',
        description: 'Defines the size of the font used in the terminal.',
        type: 'number',
        value: 16
      }
    ]
  }
]
