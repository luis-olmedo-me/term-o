export const getElementXPath = element => {
  if (!element || !element.tagName) return ''

  let xpath = ''
  let parentElement = element

  while (parentElement.tagName !== 'HTML') {
    const tagName = parentElement.tagName.toLowerCase()

    let siblingIndex = 1
    let sibling = parentElement.previousElementSibling

    while (sibling) {
      if (sibling.tagName === tagName) {
        siblingIndex++
      }

      sibling = sibling.previousElementSibling
    }

    const tagSelector = `${tagName}[${siblingIndex}]`

    xpath = '/' + tagSelector + xpath
    parentElement = parentElement.parentElement
  }

  xpath = '/html' + xpath

  return xpath.toLowerCase()
}

export const getElementByXPath = xpath => {
  return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue
}
