export const cleanTabId = tabIdRaw => {
  const tabIdString = tabIdRaw.replace(/^T/, '')

  return Number(tabIdString)
}

export const createInternalTab = originalTab => {
  return {
    id: originalTab.id,
    url: originalTab.url,
    title: originalTab.title,
    status: originalTab.status,
    windowId: originalTab.windowId,
    incognito: originalTab.incognito
  }
}
