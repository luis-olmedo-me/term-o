export const getSelectedText = () => {
  return window.getSelection().toString()
}

export const copyText = value => {
  navigator.clipboard.writeText(value || '')
}
