export const createCloseTabsProcess = (resolve, tabIds) => {
  chrome.tabs.remove(tabIds, () => {
    resolve()
  })
}

export const createHistoryProcess = (resolve, data) => {
  chrome.history.search(data, historial => {
    const filteredHistory = historial.map(({ lastVisitTime, url, title, id }) => {
      return { date: lastVisitTime, url, title, id }
    })

    resolve(filteredHistory)
  })
}

export const createTabsOpenProcess = (resolve, data) => {
  const { text, incognito: filterIncognitos, ...options } = data

  chrome.tabs.query(options, function(tabs) {
    const filteredTabs = tabs.reduce((finalTabs, { favIconUrl, title, url, id, incognito }) => {
      const titleLower = title.toLowerCase()
      const urlLower = url.toLowerCase()

      const matchText = urlLower.includes(text) || titleLower.includes(text)
      const isFilteredByIncognito = filterIncognitos ? incognito : true

      return (matchText || !text) && isFilteredByIncognito
        ? finalTabs.concat({
            favIconUrl,
            title,
            url,
            id,
            date: 'Now'
          })
        : finalTabs
    }, [])

    resolve(filteredTabs)
  })
}

export const createUpdateTabProccess = (resolve, data) => {
  const { tabId, props } = data

  chrome.tabs.update(tabId, props, () => {
    resolve()
  })
}

export const createUpdateWindowProccess = (resolve, data) => {
  const { windowId, props } = data

  chrome.windows.update(windowId, props, () => {
    resolve()
  })
}
