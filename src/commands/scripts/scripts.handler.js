import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatFile, formatScript } from '@src/helpers/format.helpers'
import { executeCode, readFileContent, uploadFile } from './scripts.helpers'

export const scriptsHandler = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const scripts = storage.get(storageKeys.SCRIPTS)
    const updates = scripts.map(formatScript)

    command.update(...updates)
  }

  if (P`upload`) {
    const file = await uploadFile()

    command.update('Reading uploaded file.')
    const fileContent = await readFileContent(file)
    const newScript = { name: file.name, content: fileContent }

    const scripts = storage.get(storageKeys.SCRIPTS)
    const alreadyExists = scripts.some(script => script.name === file.name)

    if (alreadyExists) {
      return command.throw(`The script "${file.name}" already exists.`)
    }

    const newScripts = scripts.concat(newScript)
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

    await executeCode({
      scriptContent: existingScript.content,
      command
    })
  }

  if (P`help`) createHelpView(command)
}
