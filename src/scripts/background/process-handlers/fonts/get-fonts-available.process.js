export const getFontsAvailable = async () => {
  return await chrome.fontSettings.getFontList()
}
