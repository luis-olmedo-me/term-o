import storage from '@src/libs/storage'

import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatFile, formatScript } from '@src/helpers/format.helpers'
import { getAccentColors } from '@src/helpers/themes.helpers'
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
    const config = storage.get(storageKeys.CONFIG)

    const themeName = config.getValueById(configInputIds.THEME_NAME)
    const fontFamily = config.getValueById(configInputIds.FONT_FAMILY)
    const colorAccent = config.getValueById(configInputIds.COLOR_ACCENT)

    const theme = config.themes.find(theme => theme.name === themeName)
    const selectedTheme = { ...theme, ...getAccentColors(theme, colorAccent) }

    command.update('Click the bubble on the page to start uploading a file.')
    const file = await uploadFile(tabId, { theme: selectedTheme, fontFamily })

    const scripts = storage.get(storageKeys.SCRIPTS)
    const alreadyExists = scripts.some(script => script.name === file.name)

    if (alreadyExists) throw `The script "${file.name}" already exists.`

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

    if (!existingScript) throw `The script "${name}" does not exist.`

    const newScripts = scripts.filter(script => script.name !== name)
    const update = formatScript(existingScript)

    storage.set(storageKeys.SCRIPTS, newScripts)
    command.update(update)
  }

  if (P`run`) {
    const name = P`run`
    const scripts = storage.get(storageKeys.SCRIPTS)
    const existingScript = scripts.find(script => script.name === name)

    if (!existingScript) throw `The script "${name}" does not exist.`

    command.update('Executing.')
    const updates = await executeCode({ script: existingScript.content })

    command.setUpdates(...updates)
  }

  if (P`help`) createHelpView(command)
}
