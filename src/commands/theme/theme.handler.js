import storage from '@src/libs/storage'

import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { defaultColorTheme } from '@src/constants/themes.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatTheme } from '@src/helpers/format.helpers'

export const themeHandler = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const updates = storage.get(storageKeys.THEMES).map(formatTheme)

    command.update(...updates)
  }

  if (P`current`) {
    const config = storage.get(storageKeys.CONFIG)
    const themeName = config.getValueById(configInputIds.THEME_NAME)

    const update = formatTheme({ name: themeName })

    command.update(update)
  }

  if (P`import`) {
    const newTheme = JSON.parse(P`import`)

    const config = storage.get(storageKeys.CONFIG)
    const alreadyExists = config.themes.some(set => set.name === newTheme.name)

    if (alreadyExists) {
      return command.throw(`The theme "${newTheme.name}" already exists.`)
    }

    config.addTheme(newTheme)
    config.change(configInputIds.THEME_NAME, newTheme.name)

    const update = formatTheme(newTheme)

    command.update(update)
  }

  if (P`delete`) {
    const name = P`delete`

    const config = storage.get(storageKeys.CONFIG)
    const themeName = config.getValueById(configInputIds.THEME_NAME)

    const alreadyExists = config.themes.some(set => set.name === name)
    const isDefault = defaultColorTheme.name === name
    const isCurrentTheme = name === themeName

    if (isDefault) {
      return command.throw(`The theme "${name}" is a default theme that can not be deleted.`)
    }

    if (!alreadyExists) {
      return command.throw(`The theme "${name}" does not exist.`)
    }

    if (isCurrentTheme) config.change(configInputIds.THEME_NAME, defaultColorTheme.name)
    config.removeTheme(name)

    const update = formatTheme({ name })

    command.update(update)
  }

  if (P`apply`) {
    const name = P`apply`

    const config = storage.get(storageKeys.CONFIG)
    const themeName = config.getValueById(configInputIds.THEME_NAME)

    const alreadyExists = config.themes.some(set => set.name === name)
    const isCurrentTheme = name === themeName

    if (!alreadyExists) {
      return command.throw(`The theme "${name}" is unrecognized.`)
    }

    if (isCurrentTheme) {
      return command.throw(`The theme "${name}" is already applied.`)
    }

    config.change(configInputIds.THEME_NAME, name)

    const update = formatTheme({ name })

    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
