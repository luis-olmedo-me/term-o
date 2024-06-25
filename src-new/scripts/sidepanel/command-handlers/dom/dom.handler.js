export const handleDOM = async command => {
  const tab = command.data.tab

  command.update('Getting elements.')
  const elements = await chrome.tabs.sendMessage(tab.id, 'get-dom-elements')

  for (const element of elements) {
    command.update(element)
  }

  command.update(`Found ${elements.length} elements.`)
}
