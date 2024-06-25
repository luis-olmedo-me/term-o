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
  const { tab } = command.data
  const { get } = command.props

  command.update('Getting elements.')
  const elements = await request(tab.id, {
    type: 'get-dom-elements',
    data: { get }
  })

  command.reset()
  command.update(elements)
  command.update(`Found ${elements.length} elements.`)
}
