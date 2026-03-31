import { getElementByXPath } from '@content/helpers/dom-locator.helpers'
import { convertElementsGapToJSON } from '@content/helpers/format.helpers'

export default async (resolve, reject, data) => {
  const { start, end } = data

  const elementStart = getElementByXPath(start)
  const elementEnd = getElementByXPath(end)

  if (!elementStart) return reject('XPath did not match any element.')
  if (!elementEnd) return reject('XPath did not match any element.')

  const elementsGapAsJSON = convertElementsGapToJSON(elementStart, elementEnd)

  resolve(elementsGapAsJSON)
}
