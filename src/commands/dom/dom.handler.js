import processManager from '@src/libs/process-manager'

import { getTab } from '@src/browser-api/tabs.api'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatElement, formatGap } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const domHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  let tabId = storage.get(storageKeys.TAB).id

  if (P`tab-id`) {
    command.update(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

  if (P`inject`) {
    command.update(['"Searching for element xpath."'])
    const element = await processManager.findDOMElement(tabId, {
      searchByXpath: P`on`,
      searchBelow: P`below`,
      siblingIndex: P`sibling`,
      parentIndex: P`parent`,
      childIndex: P`child`
    })

    command.reset()
    if (!element) return

    command.update(['"Injecting content."'])
    await processManager.injectHTML(tabId, {
      below: element.xpath,
      html: P`inject`
    })

    const update = formatElement({
      ...element,
      tabId: P`tab-id`,
      xpath: P`xpath` ? element.xpath : null,
      textContent: null
    })

    command.reset()
    command.update(update)

    return
  }

  if (P`on`) {
    command.update(['"Searching for element xpath."'])
    const element = await processManager.findDOMElement(tabId, {
      searchByXpath: P`on`,
      searchBelow: P`below`,
      siblingIndex: P`sibling`,
      parentIndex: P`parent`,
      childIndex: P`child`
    })

    command.reset()
    if (!element) return

    const update = formatElement({
      ...element,
      tabId: P`tab-id`,
      xpath: P`xpath` ? element.xpath : null,
      textContent: null
    })

    command.update(update)

    return
  }

  if (P`create`) {
    command.update(['"Creating element."'])
    const element = await processManager.createElement(tabId, {
      tagName: P`create`,
      below: P`below`,
      attributes: P`attr`
    })

    const update = formatElement({
      ...element,
      tabId: P`tab-id`,
      xpath: null,
      textContent: null
    })

    command.reset()
    command.update(update)

    return
  }

  if (P`search`) {
    command.update(['"Searching for element."'])
    const elements = await processManager.getDOMElements(tabId, {
      searchBelow: P`below`,
      searchByTag: P`tag`,
      searchByAttribute: P`attr`,
      searchByStyle: P`style`,
      searchByText: P`text`
    })

    const updates = elements.map(element =>
      formatElement({
        ...element,
        tabId: P`tab-id`,
        xpath: P`xpath` ? element.xpath : null,
        textContent: P`content` ? element.textContent : null
      })
    )

    command.reset()
    command.update(...updates)

    return
  }

  if (P`pick`) {
    const config = storage.get(storageKeys.CONFIG)
    let updates = []

    for (let index = 0; index < P`times`; index++) {
      command.update(['"Please click over the page to pick up an element."'])
      const element = await processManager.requestElement(tabId, { theme: config.theme })
      const update = formatElement({
        ...element,
        tabId: P`tab-id`,
        xpath: P`xpath` ? element.xpath : null,
        textContent: P`content` ? element.textContent : null
      })

      command.update(update)
      updates = [...updates, update]
    }

    command.reset()
    command.update(...updates)
  }

  if (P`measure`.length) {
    const [xpathA, xpathB] = P`measure`

    command.update(['"Measuring distance between given elements."'])
    const measure = await processManager.measure(tabId, {
      start: xpathA,
      end: xpathB
    })
    const update = formatGap(measure, xpathA, xpathB)

    command.reset()
    command.update(update)

    return
  }

  if (P`help`) createHelpView(command)
}
