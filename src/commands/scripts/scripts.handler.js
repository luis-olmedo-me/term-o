import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatFile, formatScript } from '@src/helpers/format.helpers'
import { executeCode, uploadFile } from '@src/processes'

export const scriptsHandler = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const scripts = storage.get(storageKeys.SCRIPTS)
    const updates = scripts.map(formatScript)

    command.update(...updates)
  }

  if (P`upload`) {
    const tabId = storage.get(storageKeys.TAB).id

    command.update('Upload file.')
    const file = await uploadFile(tabId)

    if (!file) throw 'Fail uploading file.'

    const scripts = storage.get(storageKeys.SCRIPTS)
    const alreadyExists = scripts.some(script => script.name === file.name)

    if (alreadyExists) {
      return command.throw(`The script "${file.name}" already exists.`)
    }

    const newScripts = scripts.concat(file)
    const update = formatFile(file)

    storage.set(storageKeys.SCRIPTS, newScripts)

    command.reset()
    command.update(update)
  }

  if (P`delete`) {
    const name = P`delete`

    const scripts = storage.get(storageKeys.SCRIPTS)
    const existingScript = scripts.find(script => script.name === name)

    if (!existingScript) {
      return command.throw(`The script "${name}" does not exist.`)
    }

    const newScripts = scripts.filter(script => script.name !== name)
    const update = formatScript(existingScript)

    storage.set(storageKeys.SCRIPTS, newScripts)
    command.update(update)
  }

  if (P`run`) {
    const name = P`run`
    const scripts = storage.get(storageKeys.SCRIPTS)
    const existingScript = scripts.find(script => script.name === name)

    if (!existingScript) {
      return command.throw(`The script "${name}" does not exist.`)
    }

    command.update('Executing.')
    const { error, updates } = await executeCode({ script: existingScript.content })

    if (error) command.throw(error)
    else command.setUpdates(...updates)
  }

  if (P`help`) createHelpView(command)
}
