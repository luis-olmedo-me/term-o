export const getTabsHistory = async ({ byTitle, byUrl, startTime, maxResults, endTime }) => {
  const titlePattern = byTitle && new RegExp(byTitle)
  const urlPattern = byUrl && new RegExp(byUrl)
  const history = await chrome.history.search({ text: '', startTime, maxResults, endTime })

  return history.filter(historyItem => {
    let validations = []

    if (byTitle) validations.push(() => titlePattern.test(historyItem.title))
    if (byUrl) validations.push(() => urlPattern.test(historyItem.url))

    return validations.every(validation => validation())
  })
}

export const deleteTabsHistory = ({ startTime, endTime }) => {
  return chrome.history.deleteRange({ startTime, endTime })
}
