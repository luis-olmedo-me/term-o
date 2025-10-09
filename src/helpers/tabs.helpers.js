export const cleanTabId = tabIdRaw => {
  const tabIdString = tabIdRaw.replace(/^T/, '')

  return Number(tabIdString)
}
