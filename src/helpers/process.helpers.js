export const setUpHandlers = processHandlers => (request, sender, sendResponse) => {
  const { data } = request.data || {}
  const handler = processHandlers[request.type]

  if (!handler) return

  handler(
    data => sendResponse({ status: 'ok', data }),
    error => sendResponse({ status: 'error', error }),
    data
  )

  return true
}
