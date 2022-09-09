export const cancelPropagation = (callback) => {
  return (event) => {
    event.stopPropagation()

    callback?.(event)
  }
}
