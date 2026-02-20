import processManager from '@src/libs/process-manager'

import { createHelpView } from '@src/helpers/command.helpers'
import { formatText } from '@src/helpers/format.helpers'

export const inputHandler = async command => {
  const P = name => command.props[name]

  if (P`request`) {
    command.update([P`title`])
    const input = await processManager.requestInput()
    const formattedInput = formatText({ text: input })

    command.reset()
    command.update(formattedInput)
  }

  if (P`help`) createHelpView(command)
}
