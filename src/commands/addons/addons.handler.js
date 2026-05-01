import processManager from '@src/libs/process-manager'

import { commandNames, origins } from '@src/constants/command.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatAddon, formatText } from '@src/helpers/format.helpers'
import { getQuotedString } from '@src/helpers/string.helpers'
import { truncate } from '@src/helpers/utils.helpers'

export const addonsHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  if (P`list`) {
    const addons = storage.get(storageKeys.ADDONS)
    const logs = addons.values.map(formatAddon)

    command.log(...logs)
  }

  if (P`upload`) {
    const addons = storage.get(storageKeys.ADDONS)
    const isTermOpen = command.get('isTermOpen')
    const origin = command.get('origin')

    if (!isTermOpen) {
      throw 'Please make sure the terminal is open before attempting to upload a file.'
    }

    if (origin !== origins.MANUAL) {
      command.log(['"To proceed, you need to upload a file. Do you want to upload it now? (y/n)"'])
      const input = await processManager.requestInput()
      const formattedInput = formatText({ text: input })
      const truncatedInput = truncate(input, 30)
      const quotedInput = getQuotedString(truncatedInput)

      command.log(formattedInput)
      if (input === 'n') throw 'Operation canceled by user.'
      if (input !== 'y') throw `Invalid input ${quotedInput}. Defaulting to cancellation.`
    }

    command.log(['"Select a file to upload."'])
    const file = await processManager.uploadFile({ extensions: ['json'] })
    const newAddon = JSON.parse(file.content)

    const alreadyExists = addons.has(newAddon.name)
    const isDefault = Object.values(commandNames).includes(newAddon.name)

    if (isDefault) throw `The addon's name "${newAddon.name}" can not be taken.`
    if (alreadyExists) throw `The addon "${newAddon.name}" already exists.`

    addons.add(newAddon)
    const log = formatAddon(newAddon)

    command.clearLogs()
    command.log(log)
  }

  if (P`delete`) {
    const name = P`name`

    const addons = storage.get(storageKeys.ADDONS)
    const addon = await addons.get(name)

    if (!addon) throw `The addon "${name}" does not exist.`
    const log = formatAddon(addon)

    addons.delete(name)
    command.log(log)
  }

  if (P`help`) createHelpView(command)
}
