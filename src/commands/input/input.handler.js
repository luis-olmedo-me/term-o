import processManager from '@src/libs/process-manager'

import { createHelpView } from '@src/helpers/command.helpers'
import { formatText } from '@src/helpers/format.helpers'

export const inputHandler = async command => {
  const P = name => command.props[name]

  if (P`text`) {
    const input = await processManager.requestInput()
    const log = formatText({ text: input })

    command.clearLogs()
    command.log(log)
  }

  if (P`help`) createHelpView(command)
}
