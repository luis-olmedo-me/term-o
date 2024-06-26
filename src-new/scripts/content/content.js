import processWaitList from '@src/libs/process-wait-list'

export const getElementsFromDOM = (resolve, data) => {
  try {
    const elementsFromDOM = window.document.querySelectorAll(data.patterns) || []
    const elements = Array.from(elementsFromDOM)

    resolve(elements)
  } catch (error) {
    console.log('💬  error:', error)
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
