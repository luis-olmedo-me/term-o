import {
  injectableStates,
  injectableTypes,
  TERMO_SOURCE
} from '@src/constants/injectales.constants'

export default async (resolve, _reject, _data, { sender }) => {
  chrome.scripting.executeScript({
    target: { tabId: sender.tab.id },
    world: 'MAIN',
    func: (TERMO_SOURCE, injectableStates, injectableTypes) => {
      window.addEventListener('message', async event => {
        const type = event.data?.type
        const isExpectedType = Object.values(injectableTypes).includes(type)

        if (event.data?.source !== TERMO_SOURCE) return
        if (event.data?.state !== injectableStates.REGISTERED) return
        if (!isExpectedType) return

        let response
        if (type === injectableTypes.READ_VARIABLE) {
          try {
            const path = event.data.data.path.split('.')
            let rawValue = window

            for (const key of path) {
              rawValue = rawValue?.[key]
            }

            const stringify = (val, forbiddenKeys = [], forbiddenValues = []) => {
              if (typeof val === 'function') {
                const functionName = val.name || 'anonymous'
                return '[function.' + functionName + ']'
              }
              if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                let tempObject = {}

                for (const key in val) {
                  let value = val[key]

                  if (forbiddenValues?.includes(value)) {
                    const tracePaths = forbiddenKeys.join('.')
                    const trace = tracePaths ? tracePaths + '.' + key : key
                    throw new Error(
                      'The "' + trace + '" reference is being called within an infinite loop.'
                    )
                  }

                  tempObject[key] = stringify(
                    val[key],
                    [...forbiddenKeys, key],
                    [...forbiddenValues, val]
                  )
                }

                return tempObject
              }

              return val
            }

            response = rawValue !== null ? JSON.stringify(stringify(rawValue)) : null
          } catch (e) {
            response = e.message
          }
        }

        event.source.postMessage(
          {
            source: TERMO_SOURCE,
            state: injectableStates.SOLVED,
            id: event.data.id,
            type,
            response
          },
          '*'
        )
      })
    },
    args: [TERMO_SOURCE, injectableStates, injectableTypes]
  })

  resolve(null)
}
