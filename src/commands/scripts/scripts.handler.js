import processManager from '@src/libs/process-manager'
import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatFile as formatMetadata } from '@src/helpers/format.helpers'

export const scriptsHandler = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const scripts = storage.get(storageKeys.SCRIPTS)
    const updates = scripts.values.map(formatMetadata)

    command.update(...updates)
  }

  if (P`upload`) {
    const tabId = storage.get(storageKeys.TAB).id
    const config = storage.get(storageKeys.CONFIG)
    const scripts = storage.get(storageKeys.SCRIPTS)

    command.update('Click the notification on the page to start uploading a file.')
    const file = await processManager.uploadFile(tabId, {
      theme: config.theme,
      extensions: ['js']
    })

    const alreadyExists = scripts.has(file.name)

    if (alreadyExists) throw `The script "${file.name}" already exists.`

    scripts.add(file.name, file.lastVisitTime, file.size, file.content)
    const update = formatMetadata(file)

    command.reset()
    command.update(update)
  }

  if (P`delete`) {
    const name = P`delete`

    const scripts = storage.get(storageKeys.SCRIPTS)
    const script = await scripts.get(name)

    if (!script) throw `The script "${name}" does not exist.`
    const metadata = scripts.getMetadata(name)

    const update = formatMetadata(metadata)

    scripts.delete(name)
    command.update(update)
  }

  if (P`run`) {
    const name = P`run`
    const scripts = storage.get(storageKeys.SCRIPTS)
    const addons = storage.get(storageKeys.ADDONS)

    const addonNames = addons.values.map(addon => addon.name)
    const script = await scripts.get(name)

    if (!script) throw `The script "${name}" does not exist.`

    command.update('Executing.')
    const updates = await processManager.executeCode({ code: script, props: {}, addonNames })

    command.setUpdates(...updates)
  }

  if (P`help`) createHelpView(command)
}
