import processManager from '@src/libs/process-manager'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatElement } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const domHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  const tabId = P`tab-id` ? cleanTabId(P`tab-id`) : storage.get(storageKeys.TAB).id

  if (P`on`) {
    command.update(['"Connecting to the tab."'])
    const element = await processManager.findDOMElement(tabId, {
      searchByXpath: P`on`,
      searchBelow: P`below`,
      siblingIndex: P`sibling`,
      parentIndex: P`parent`,
      childIndex: P`child`
    })

    command.reset()
    if (!element) return

    if (P`inject`) {
      command.update(['"Connecting to the tab."'])
      await processManager.injectHTML(tabId, {
        below: element.xpath,
        html: P`inject`
      })

      command.reset()
    }

    const update = formatElement({
      ...element,
      tabId: P`tab-id`,
      xpath: P`xpath` ? element.xpath : null,
      textContent: null
    })

    command.update(update)
  }

  if (P`create`) {
    command.update(['"Connecting to the tab."'])
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
  }

  if (P`search`) {
    command.update(['"Connecting to the tab."'])
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

  if (P`help`) createHelpView(command)
}
