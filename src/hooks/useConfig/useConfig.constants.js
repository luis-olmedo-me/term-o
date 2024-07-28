import { getColor as C } from '@src/libs/themer'

export const configSections = [
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Configure various settings related to the terminal appearance and behavior.',
    inputs: [
      {
        id: 'copy-on-selection',
        name: 'Automatic Copy on Selection',
        description:
          'Automatically copies text to the clipboard when it is selected using the mouse.',
        type: 'checkbox',
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
        type: 'text',
        value: `On ${C`brightBlue`}{origin}`
      }
    ]
  }
]

export const defaultConfigValues = configSections.map(section => {
  return {
    id: section.id,
    inputs: section.inputs.reduce((values, input) => ({ ...values, [input.id]: input.value }), {})
  }
})
