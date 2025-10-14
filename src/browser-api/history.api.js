export const getTabsHistory = ({ byTitle, byUrl, ...options }) => {
  const titlePattern = byTitle && new RegExp(byTitle)
  const urlPattern = byUrl && new RegExp(byUrl)
  const history = chrome.history.search(options)

  return history.filter(historyItem => {
    let validations = []

    if (byTitle) validations.push(() => titlePattern.test(historyItem.title))
    if (byUrl) validations.push(() => urlPattern.test(historyItem.url))

    return validations.every(validation => validation())
  })
}

export const deleteTabsHistory = options => {
  return chrome.history.deleteRange(options)
}
