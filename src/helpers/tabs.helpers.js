export const cleanTabId = tabIdRaw => {
  const tabIdString = tabIdRaw.replace(/^T/, '')

  return Number(tabIdString)
}

export const createInternalTab = originalTab => {
  return {
    id: originalTab.id,
    url: originalTab.url || originalTab.pendingUrl,
    title: originalTab.title || originalTab.url || originalTab.pendingUrl,
    status: originalTab.status,
    windowId: originalTab.windowId,
    incognito: originalTab.incognito
  }
}
