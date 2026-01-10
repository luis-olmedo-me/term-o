import processManager from '@src/libs/process-manager'
import storage from '@src/libs/storage'

import { commandNames } from '@src/constants/command.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatAddon } from '@src/helpers/format.helpers'

export const addonsHandler = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const addons = storage.get(storageKeys.ADDONS)
    const updates = addons.values.map(formatAddon)

    command.update(...updates)
  }

  if (P`upload`) {
    const tabId = storage.get(storageKeys.TAB).id
    const config = storage.get(storageKeys.CONFIG)
    const addons = storage.get(storageKeys.ADDONS)

    command.update('Click the notification on the page to start uploading a file.')
    const file = await processManager.uploadFile(tabId, {
      theme: config.theme,
      extensions: ['json']
    })
    const newAddon = JSON.parse(file.content)

    const alreadyExists = addons.has(newAddon.name)
    const isDefault = Object.values(commandNames).includes(newAddon.name)

    if (isDefault) throw `The addon's name "${newAddon.name}" can not be taken.`
    if (alreadyExists) throw `The addon "${newAddon.name}" already exists.`

    addons.add(newAddon)
    const update = formatAddon(newAddon)

    command.reset()
    command.update(update)
  }

  if (P`delete`) {
    const name = P`delete`

    const addons = storage.get(storageKeys.ADDONS)
    const addon = await addons.get(name)

    if (!addon) throw `The addon "${name}" does not exist.`
    const update = formatAddon(addon)

    addons.delete(name)
    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
