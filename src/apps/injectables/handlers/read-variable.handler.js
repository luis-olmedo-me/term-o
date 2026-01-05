import { injectableStates, TERMO_SOURCE } from '@src/constants/injectales.constants'

export default function readVariableHandler(event) {
  return new Promise(resolve => {
    const script = document.createElement('script')
    const path = event.data.data.path

    const receive = async receivedEvent => {
      if (receivedEvent.data?.source !== TERMO_SOURCE) return
      if (receivedEvent.data?.type !== event.data.type) return
      if (receivedEvent.data?.state !== injectableStates.SOLVING) return
      window.removeEventListener('message', receive)

      resolve({
        value: receivedEvent.data.value,
        error: receivedEvent.data.error
      })
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
            source: "${TERMO_SOURCE}",
            state: "${injectableStates.SOLVING}",
            type: "${event.data.type}",
            value: value ?? "null",
            error: null
          }, "*");
        } catch (e) {
          window.postMessage({
            source: "${TERMO_SOURCE}",
            state: "${injectableStates.SOLVING}",
            type: "${event.data.type}",
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
