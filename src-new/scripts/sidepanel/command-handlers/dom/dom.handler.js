export const handleDOM = command => {
  command.update('Searching for DOM elements.')

  setTimeout(() => {
    command.update('Searching for DOM elements twice.')
  }, 1000)
}
