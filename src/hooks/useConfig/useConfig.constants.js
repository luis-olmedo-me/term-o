export const configSections = [
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Configure various settings related to the terminal appearance and behavior.',
    inputs: [
      {
        id: 'focus-prompt-on-click',
        name: 'Focus Prompt on Click',
        description:
          'Automatically brings the prompt input field into focus when it is clicked with the mouse. This helps streamline user input by ensuring the prompt is active without needing additional key presses.',
        type: 'boolean',
        value: true
      },
      {
        id: 'copy-on-selection',
        name: 'Automatic Copy on Selection',
        description:
          'Automatically copies text to the clipboard when it is selected using the mouse.',
        type: 'boolean',
        value: true
      },
      {
        id: 'switch-tab-automatically',
        name: 'Switch Tab Automatically',
        description:
          'Automatically switches to a new tab when it is created or activated. This setting improves workflow efficiency by ensuring that the user is always working in the current tab.',
        type: 'boolean',
        value: true
      },
      {
        id: 'max-lines-per-command',
        name: 'Maximum Lines per Command',
        description:
          'Sets the maximum number of lines that a single command can output before scrolling begins.',
        type: 'number',
        value: 50
      },
      {
        id: 'historial-size',
        name: 'Command History Size',
        description: 'Defines the number of previous commands to be stored in the command history.',
        type: 'number',
        value: 40
      }
    ]
  },
  {
    id: 'prompt',
    name: 'Prompt',
    description:
      'Adjust settings related to the command prompt appearance and information display.',
    inputs: [
      {
        id: 'status',
        name: 'Prompt Status Label',
        description:
          'Text displayed before the prompt input field, typically used to show dynamic information or context.',
        type: 'string',
        value: `On [termo.brightBlue]{origin}`
      }
    ]
  },
  {
    id: 'theme',
    name: 'Theme',
    description: 'Customize the visual appearance of the terminal, including font settings.',
    inputs: [
      {
        id: 'font-family',
        name: 'Font Family',
        description: 'Specifies the font family used for displaying text in the terminal.',
        type: 'string',
        value: 'monospace'
      },
      {
        id: 'font-size',
        name: 'Font Size',
        description: 'Defines the size of the font used in the terminal.',
        type: 'number',
        value: 16
      }
    ]
  }
]
