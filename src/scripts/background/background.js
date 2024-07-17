chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

let userEvents = []

const getUserEventsFromLS = async () => {
  const { events = [] } = await chrome.storage.local.get('events')

  userEvents = events
}

getUserEventsFromLS()
