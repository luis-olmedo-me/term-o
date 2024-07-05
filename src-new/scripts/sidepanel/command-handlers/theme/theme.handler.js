import { getColor as C } from '@src/theme/theme.helpers'

export const handleTHEME = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const response = await chrome.storage.local.get('color-sets')
    const colorSets = response['color-sets'] || []

    colorSets.forEach(({ name }) => {
      command.update(`${C`purple`}"${name}"`)
    })
  }

  if (P`add`) {
    const newColorSet = JSON.parse(P`add`)

    const response = await chrome.storage.local.get('color-sets')
    const colorSets = response['color-sets'] || []

    const alreadyExists = colorSets.some(set => set.name.includes(newColorSet.name))

    const newColorSets = alreadyExists
      ? colorSets.map(set => (set.name === newColorSet.name ? newColorSet : set))
      : colorSets.concat(newColorSet)

    await chrome.storage.local.set({ ['color-sets']: newColorSets })

    command.update(`${C`purple`}"${newColorSet.name}"`)
  }

  if (P`delete`) {
    const name = P`delete`

    const response = await chrome.storage.local.get('color-sets')
    const colorSets = response['color-sets'] || []

    const existingSet = colorSets.find(set => set.name.includes(newColorSet.name))

    if (!existingSet) return
    const newColorSets = colorSets.filter(set => set.name !== name)

    await chrome.storage.local.set({ ['color-sets']: newColorSets })

    command.update(`${C`purple`}"${name}"`)
  }
}
