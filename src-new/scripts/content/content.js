import processWaitList from '@src/libs/process-wait-list'

export const getElementsFromDOM = (resolve, data) => {
  try {
    const elementsFromDOM = window.document.querySelectorAll(data.patterns) || []
    const elements = Array.from(elementsFromDOM).map(element => {
      const tagName = element.tagName.toLowerCase()
      const id = element.getAttribute('id')
      const classes = element.getAttribute('class')?.replaceAll(' ', '.')

      let label = tagName
      if (id) label = `${label}#${id}`
      if (classes && !id) label = `${label}.${classes}`

      return label
    })

    resolve(elements)
  } catch (error) {
    throw 'Something went wrong!'
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { id, data } = request.data

  if (request.type === 'get-dom-elements') {
    const process = id
      ? processWaitList.getProcessById(id)
      : processWaitList.add(resolve => getElementsFromDOM(resolve, data))

    return sendResponse({ status: 'ok', data: process })
  }
})
