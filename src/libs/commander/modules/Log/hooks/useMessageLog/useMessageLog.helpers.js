export const replaceByParams = (message, params) => {
  return message.replace(/\{([^\}]+)?\}/g, (_, paramKey) => params[paramKey])
}
