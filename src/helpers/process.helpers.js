export const setUpHandlers = processHandlers => (request, sender, sendResponse) => {
  const { data } = request.data || {}
  const handler = processHandlers[request.type]

  if (!handler) return

  handler(response => sendResponse({ status: 'ok', data: response }), data)

  return true
}
