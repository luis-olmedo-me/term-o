export const importInjectables = () => {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('assets/js/injectables.js')
  script.type = 'module'

  document.documentElement.appendChild(script)
  script.remove()
}
