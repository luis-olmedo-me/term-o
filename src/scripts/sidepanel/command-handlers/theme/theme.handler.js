import themer from '@src/libs/themer'
import { displayHelp, formatTheme } from '../command-handlers.helpers'

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

    const update = formatTheme(newSet)

    await themer.addColorTheme(newSet)
    await themer.applyColorTheme(newSet.name)

    command.update(update)
  }

  if (P`delete`) {
    const name = P`delete`
    const currentName = themer.colorTheme.name

    const alreadyExists = themer.colorThemes.some(set => set.name === name)
    const isDefault = themer.isDefault(name)

    if (isDefault) {
      return command.throw(`The theme "${name}" is a default theme that can not be deleted.`)
    }

    if (!alreadyExists) {
      return command.throw(`The theme "${name}" does not exist.`)
    }

    const update = formatTheme({ name })

    if (name === currentName) await themer.applyColorTheme(themer.defaultColorName)
    await themer.removeColorTheme(name)

    command.update(update)
  }

  if (P`apply`) {
    const name = P`apply`

    const colorSets = themer.colorThemes
    const alreadyExists = colorSets.some(set => set.name === name)

    if (!alreadyExists) {
      return command.throw(`The theme "${name}" is unrecognized.`)
    }

    const update = formatTheme({ name })

    themer.applyColorTheme(name)
    command.update(update)
  }

  if (P`help`) displayHelp(command)
}
