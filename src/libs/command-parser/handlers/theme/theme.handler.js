import themer from '@src/libs/themer'

import { createHelpView } from '@src/helpers/command.helpers'
import { formatTheme } from '../handlers.helpers'

export const handleTHEME = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const updates = themer.colorThemes.map(formatTheme)

    command.update(...updates)
  }

  if (P`current`) {
    const name = themer.colorTheme.name
    const update = formatTheme({ name })

    command.update(update)
  }

  if (P`import`) {
    const newSet = JSON.parse(P`import`)

    const alreadyExists = themer.colorThemes.some(set => set.name.includes(newSet.name))

    if (alreadyExists) {
      return command.throw(`The theme "${newSet.name}" already exists.`)
    }

    await themer.addColorTheme(newSet)
    await themer.applyColorTheme(newSet.name)

    const update = formatTheme(newSet)

    command.update(update)
  }

  if (P`delete`) {
    const name = P`delete`

    const alreadyExists = themer.colorThemes.some(set => set.name === name)
    const isDefault = themer.isDefault(name)
    const isCurrentTheme = name === themer.colorTheme.name

    if (isDefault) {
      return command.throw(`The theme "${name}" is a default theme that can not be deleted.`)
    }

    if (!alreadyExists) {
      return command.throw(`The theme "${name}" does not exist.`)
    }

    if (isCurrentTheme) await themer.applyColorTheme(themer.defaultColorName)
    await themer.removeColorTheme(name)

    const update = formatTheme({ name })

    command.update(update)
  }

  if (P`apply`) {
    const name = P`apply`

    const alreadyExists = themer.colorThemes.some(set => set.name === name)
    const isCurrentTheme = name === themer.colorTheme.name

    if (!alreadyExists) {
      return command.throw(`The theme "${name}" is unrecognized.`)
    }

    if (isCurrentTheme) {
      return command.throw(`The theme "${name}" is already applied.`)
    }

    await themer.applyColorTheme(name)

    const update = formatTheme({ name })

    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
