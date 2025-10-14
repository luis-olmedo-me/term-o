import storage from '@src/libs/storage'

import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { defaultColorTheme } from '@src/constants/themes.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { updateConfigValueIn } from '@src/helpers/config.helpers'
import { formatTheme } from '@src/helpers/format.helpers'

export const themeHandler = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const updates = storage.get(storageKeys.COLOR_SETS).map(formatTheme)

    command.update(...updates)
  }

  if (P`current`) {
    const config = storage.get(storageKeys.CONFIG)
    const themeName = config.getValueById(configInputIds.THEME_NAME)

    const update = formatTheme({ name: themeName })

    command.update(update)
  }

  if (P`import`) {
    const newSet = JSON.parse(P`import`)

    const config = storage.get(storageKeys.CONFIG)
    const themes = storage.get(storageKeys.COLOR_SETS)
    const alreadyExists = themes.some(set => set.name === newSet.name)

    if (alreadyExists) {
      return command.throw(`The theme "${newSet.name}" already exists.`)
    }

    const newConfig = updateConfigValueIn(config, configInputIds.THEME_NAME, newSet.name)
    const newThemes = [...themes, newSet]

    storage.set(storageKeys.COLOR_SETS, newThemes)
    storage.set(storageKeys.CONFIG, newConfig)

    const update = formatTheme(newSet)

    command.update(update)
  }

  if (P`delete`) {
    const name = P`delete`

    const config = storage.get(storageKeys.CONFIG)
    const themes = storage.get(storageKeys.COLOR_SETS)
    const themeName = config.getValueById(configInputIds.THEME_NAME)

    const alreadyExists = themes.some(set => set.name === name)
    const isDefault = defaultColorTheme.name === name
    const isCurrentTheme = name === themeName

    if (isDefault) {
      return command.throw(`The theme "${name}" is a default theme that can not be deleted.`)
    }

    if (!alreadyExists) {
      return command.throw(`The theme "${name}" does not exist.`)
    }

    const newThemes = themes.filter(set => set.name !== name)

    if (isCurrentTheme) config.change(configInputIds.THEME_NAME, defaultColorTheme.name)
    storage.set(storageKeys.COLOR_SETS, newThemes)

    const update = formatTheme({ name })

    command.update(update)
  }

  if (P`apply`) {
    const name = P`apply`

    const config = storage.get(storageKeys.CONFIG)
    const themes = storage.get(storageKeys.COLOR_SETS)
    const themeName = config.getValueById(configInputIds.THEME_NAME)

    const alreadyExists = themes.some(set => set.name === name)
    const isCurrentTheme = name === themeName

    if (!alreadyExists) {
      return command.throw(`The theme "${name}" is unrecognized.`)
    }

    if (isCurrentTheme) {
      return command.throw(`The theme "${name}" is already applied.`)
    }

    const newConfig = updateConfigValueIn(config, configInputIds.THEME_NAME, name)

    storage.set(storageKeys.CONFIG, newConfig)

    const update = formatTheme({ name })

    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
