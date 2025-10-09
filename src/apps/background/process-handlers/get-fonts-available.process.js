export default async resolve => {
  const fonts = await chrome.fontSettings.getFontList()

  resolve(fonts)
}
