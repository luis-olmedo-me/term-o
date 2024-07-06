import { defaultTheme } from '@src/theme/theme.colors'
import { getColor as C } from '@src/theme/theme.helpers'

export const handleTHEME = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const response = await chrome.storage.local.get('color-sets')
    const colorSets = response['color-sets'] || []
    const allColorSets = [...defaultTheme.colorsets, ...colorSets]

    allColorSets.forEach(({ name }) => {
      command.update(`${C`purple`}"${name}"`)
    })
  }

  if (P`current`) {
    const response = await chrome.storage.local.get('color-set-name')
    const name = response['color-set-name'] || ''

    command.update(`${C`purple`}"${name}"`)
  }

  if (P`import`) {
    const newSet = JSON.parse(P`import`)

    const response = await chrome.storage.local.get('color-sets')
    const colorSets = response['color-sets'] || []

    const alreadyExists = colorSets.some(set => set.name.includes(newSet.name))

    if (alreadyExists) {
      return command.throw(`'The theme "${C`brightRed`}${newSet.name}${C`red`}" already exists.'`)
    }

    const newColorSets = colorSets.concat(newSet)

    await chrome.storage.local.set({ ['color-sets']: newColorSets })

    command.update(`${C`purple`}"${newSet.name}"`)
  }

  if (P`delete`) {
    const name = P`delete`

    const response = await chrome.storage.local.get('color-sets')
    const colorSets = response['color-sets'] || []

    const existingSet = colorSets.some(set => set.name === name)

    if (!existingSet) {
      return command.throw(`'The theme "${C`brightRed`}${name}${C`red`}" does not exist.'`)
    }

    const newColorSets = colorSets.filter(set => set.name !== name)

    await chrome.storage.local.set({ ['color-sets']: newColorSets })

    command.update(`${C`purple`}"${name}"`)
  }

  if (P`apply`) {
    const name = P`apply`

    const response = await chrome.storage.local.get('color-sets')
    const colorSets = response['color-sets'] || []
    const allColorSets = [...defaultTheme.colorsets, ...colorSets]

    const alreadyExists = allColorSets.some(set => set.name === name)

    if (!alreadyExists) {
      return command.throw(`'The theme "${C`brightRed`}${name}${C`red`}" is unrecognized.'`)
    }

    await chrome.storage.local.set({ ['color-set-name']: name })

    command.update(`${C`purple`}"${name}"`)
  }
}
