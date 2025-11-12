import { commandStatuses, origins } from '@src/constants/command.constants'
import { buildArgsFromProps, getRawArgs } from '@src/helpers/arguments.helpers'
import { cleanColors } from '@src/helpers/themes.helpers'
import { executeCommand } from '@src/processes'

export default async (resolve, _reject, data) => {
  const { script } = data

  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', chrome.runtime.getURL('sandbox.html'))
  iframe.setAttribute('style', 'display: none;')
  document.body.appendChild(iframe)

  let updates = []

  const handleCodeEval = async function (event) {
    const type = event.data?.type
    const data = event.data?.data

    switch (type) {
      case 'sandbox-command': {
        const { updates, status } = await executeCommand({
          line: buildArgsFromProps(data.props, data.name).join(' '),
          origin: origins.FORCED
        })
        const hasError = status === commandStatuses.ERROR

        const updatesUncolored = updates.map(cleanColors)
        const formattedUpdates = hasError ? updatesUncolored : updatesUncolored.map(getRawArgs)

        iframe.contentWindow.postMessage(
          {
            type: 'sandbox-command-return',
            data: { updates: formattedUpdates, hasError }
          },
          '*'
        )
        break
      }

      case 'sandbox-command-update': {
        updates = [...updates, ...data.updates]

        iframe.contentWindow.postMessage(
          {
            type: 'sandbox-command-update-return',
            data: { updates, hasError: false }
          },
          '*'
        )
        break
      }

      case 'sandbox-command-set-updates': {
        updates = [...data.updates]

        iframe.contentWindow.postMessage(
          {
            type: 'sandbox-command-set-updates-return',
            data: { updates, hasError: false }
          },
          '*'
        )
        break
      }

      case 'sandbox-command-finish': {
        document.body.removeChild(iframe)
        window.removeEventListener('message', handleCodeEval)

        resolve({ error: data.error, updates })
        break
      }
    }
  }

  iframe.onload = () => {
    window.addEventListener('message', handleCodeEval)

    iframe.contentWindow.postMessage({ type: 'sandbox-code', data: { code: script } }, '*')
  }
}
