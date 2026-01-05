export default function readVariableHandler(event) {
  return new Promise(resolve => {
    const script = document.createElement('script')
    const path = event.data.data.path
    const receive = async event => {
      if (event.source !== window) return
      if (event.data?.source !== 'MY_EXTENSION') return
      window.removeEventListener('message', receive)

      const error = event.data.error
      const value = event.data.value

      if (event.data.type === 'response') resolve({ value, error })
    }

    window.addEventListener('message', receive)

    script.textContent = `
      (function() {
        try {
          const path = "${path}".split(".");
          let rawValue = window;

          for (const key of path) {
            rawValue = rawValue?.[key];
          }

          const stringify = val => {
            if (typeof val === 'function') {
              const functionName = val.name || 'anonymous'

              return '[function.' + functionName + ']'
            }
            if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
              let tempObject = {}

              for (const key in val) {
                tempObject[key] = stringify(val[key])
              }

              return tempObject
            }

            return val
          }

          const value = rawValue !== null ? JSON.stringify(stringify(rawValue)) : null

          window.postMessage({
            source: "MY_EXTENSION",
            type: "response",
            value: value ?? null,
            error: null
          }, "*");
        } catch (e) {
          window.postMessage({
            source: "MY_EXTENSION",
            type: "response",
            value: null,
            error: e.message
          }, "*");
        }
      })();
    `

    document.documentElement.appendChild(script)
    script.remove()
  })
}
