import { getStorageValue, setStorageValue } from '@sidepanel/proccesses/workers'
import { defaultModes } from '@src/libs/color-sets'
import { getColor as C } from '@src/theme/theme.helpers'

export const handleTHEME = async command => {
  const { theme } = command.data
  const P = name => command.props[name]

  if (P`list`) {
    const colorSetsFromLS = await getStorageValue('local', 'color-sets')
    const colorSets = colorSetsFromLS || defaultModes

    colorSets.forEach(({ name }) => {
      command.update(`${C`purple`}"${name}"`)
    })
  }

  if (P`current`) {
    const name = theme.colors.name

    command.update(`${C`purple`}"${name}"`)
  }

  if (P`import`) {
    const newSet = JSON.parse(P`import`)

    const colorSetsFromLS = await getStorageValue('local', 'color-sets')
    const colorSets = colorSetsFromLS || defaultModes
    const alreadyExists = colorSets.some(set => set.name.includes(newSet.name))

    if (alreadyExists) {
      return command.throw(`The theme "${C`brightRed`}${newSet.name}${C`red`}" already exists.`)
    }

    const newColorSets = colorSets.concat(newSet)

    await setStorageValue('local', 'color-sets', newColorSets)

    command.update(`${C`purple`}"${newSet.name}"`)
  }

  if (P`delete`) {
    const name = P`delete`

    const colorSetsFromLS = await getStorageValue('local', 'color-sets')
    const colorSets = colorSetsFromLS || defaultModes
    const alreadyExists = colorSets.some(set => set.name === name)
    const isDefault = defaultModes.some(set => set.name === name)

    if (isDefault) {
      return command.throw(
        `The theme "${C`brightRed`}${name}${C`red`}" is a default theme that can not be deleted.`
      )
    }

    if (!alreadyExists) {
      return command.throw(`The theme "${C`brightRed`}${name}${C`red`}" does not exist.`)
    }

    const newColorSets = colorSets.filter(set => set.name !== name)

    await setStorageValue('local', 'color-sets', newColorSets)

    command.update(`${C`purple`}"${name}"`)
  }

  if (P`apply`) {
    const name = P`apply`

    const colorSetsFromLS = await getStorageValue('local', 'color-sets')
    const colorSets = colorSetsFromLS || defaultModes
    const alreadyExists = colorSets.some(set => set.name === name)

    if (!alreadyExists) {
      return command.throw(`The theme "${C`brightRed`}${name}${C`red`}" is unrecognized.`)
    }

    await setStorageValue('local', 'color-set-name', name)

    command.update(`${C`purple`}"${name}"`)
  }
}
