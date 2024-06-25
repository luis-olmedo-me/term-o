import { invalidURLsStarts } from '@src/constants/events.constants'

export const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  const isInvalidUrl = invalidURLsStarts.some(invalidUrl => tab.url.startsWith(invalidUrl))

  return !isInvalidUrl && tab.url ? tab : null
}
