const request = (tabId, key) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, key, response => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message))
      } else {
        resolve(response)
      }
    })
  })
}

export const handleDOM = async command => {
  const tab = command.data.tab

  command.update('Getting elements.')
  const elements = await request(tab.id, 'get-dom-elements')

  for (const element of elements) {
    command.update(element)
  }

  command.update(`Found ${elements.length} elements.`)
}
