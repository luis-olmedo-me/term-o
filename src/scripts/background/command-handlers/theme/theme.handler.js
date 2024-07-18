import { defaultSets } from '@src/libs/color-set/color-set.constants'
import { displayHelp, formatTheme } from '../command-handlers.helpers'
import { getStorageValue, setStorageValue } from '../storage/storage.helpers'

export const handleTHEME = async command => {
  const { theme } = command.data
  const P = name => command.props[name]

  if (P`list`) {
    const colorSetsFromLS = await getStorageValue('local', 'color-sets')
    const colorSets = colorSetsFromLS || defaultSets
    const updates = colorSets.map(formatTheme)

    command.update(...updates)
  }

  if (P`current`) {
    const name = theme.colors.name
    const update = formatTheme({ name })

    command.update(update)
  }

  if (P`import`) {
    const newSet = JSON.parse(P`import`)

    const colorSetsFromLS = await getStorageValue('local', 'color-sets')
    const colorSets = colorSetsFromLS || defaultSets
    const alreadyExists = colorSets.some(set => set.name.includes(newSet.name))

    if (alreadyExists) {
      return command.throw(`The theme "${newSet.name}" already exists.`)
    }

    const newColorSets = colorSets.concat(newSet)
    const update = formatTheme(newSet)

    await setStorageValue('local', 'color-sets', newColorSets)
    await setStorageValue('local', 'color-set-name', newSet.name)

    command.update(update)
  }

  if (P`delete`) {
    const name = P`delete`
    const currentName = theme.colors.name
    const defaultName = 'Default Dark Mode'

    const colorSetsFromLS = await getStorageValue('local', 'color-sets')
    const colorSets = colorSetsFromLS || defaultSets
    const alreadyExists = colorSets.some(set => set.name === name)
    const isDefault = defaultSets.some(set => set.name === name)

    if (isDefault) {
      return command.throw(`The theme "${name}" is a default theme that can not be deleted.`)
    }

    if (!alreadyExists) {
      return command.throw(`The theme "${name}" does not exist.`)
    }

    const newColorSets = colorSets.filter(set => set.name !== name)
    const update = formatTheme({ name })

    if (name === currentName) await setStorageValue('local', 'color-set-name', defaultName)
    await setStorageValue('local', 'color-sets', newColorSets)

    command.update(update)
  }

  if (P`apply`) {
    const name = P`apply`

    const colorSetsFromLS = await getStorageValue('local', 'color-sets')
    const colorSets = colorSetsFromLS || defaultSets
    const alreadyExists = colorSets.some(set => set.name === name)

    if (!alreadyExists) {
      return command.throw(`The theme "${name}" is unrecognized.`)
    }

    const update = formatTheme({ name })

    await setStorageValue('local', 'color-set-name', name)
    command.update(update)
  }

  if (P`help`) displayHelp(command)
}
