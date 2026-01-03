export default async (resolve, reject, data) => {
  const handleMessage = event => {
    if (event.source !== window) return
    if (event.data?.source !== 'MY_EXTENSION') return
    window.removeEventListener('message', handleMessage)

    if (event.data.type === 'GLOBAL_VALUE') {
      console.log('Valor obtenido:', event.data.value)

      const json = event.data.value !== null ? JSON.stringify(event.data.value) : null

      resolve(json)
    }

    if (event.data.type === 'GLOBAL_ERROR') {
      reject(event.data.value)
    }
  }

  window.addEventListener('message', handleMessage)

  const script = document.createElement('script')
  const path = data.path

  script.textContent = `
    (function() {
      try {
        const path = "${path}".split(".");
        let value = window;

        for (const key of path) {
          value = value?.[key];
        }

        window.postMessage({
          source: "MY_EXTENSION",
          type: "GLOBAL_VALUE",
          path: "${path}",
          value: value ?? null
        }, "*");
      } catch (e) {
        window.postMessage({
          source: "MY_EXTENSION",
          type: "GLOBAL_ERROR",
          error: e.message
        }, "*");
      }
    })();
  `

  document.documentElement.appendChild(script)
  script.remove()
}
