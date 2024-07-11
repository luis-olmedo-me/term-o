import { getElementByXPath } from './dom.helpers'

export const clickElement = async (resolve, data) => {
  const { searchByXpath } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return resolve({})

  element.click()

  resolve({ name: 'click', target: searchByXpath })
}
