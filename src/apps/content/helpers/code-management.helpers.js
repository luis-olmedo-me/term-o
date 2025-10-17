export const inject = customFunction => {
  const script = document.createElement('script')
  script.textContent = `(${customFunction})();`

  document.documentElement.appendChild(script)

  script.remove()
}
