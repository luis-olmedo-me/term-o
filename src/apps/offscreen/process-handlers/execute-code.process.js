import processManager from '@src/libs/process-manager'

import { commandStatuses, origins } from '@src/constants/command.constants'
import { sandboxEvents } from '@src/constants/sandbox.constants'
import { buildArgsFromProps, getRawArgs } from '@src/helpers/arguments.helpers'
import { cleanColors } from '@src/helpers/themes.helpers'

export default async (resolve, reject, data) => {
  const { script } = data

  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', chrome.runtime.getURL('sandbox.html'))
  iframe.setAttribute('style', 'display: none;')
  document.body.appendChild(iframe)

  let updates = []

  const handleCodeEval = async event => {
    const type = event.data?.type
    const data = event.data?.data

    switch (type) {
      case sandboxEvents.SANDBOX_COMMAND: {
        const { updates, status } = await processManager.executeCommand({
          line: buildArgsFromProps(data.props, data.name).join(' '),
          origin: origins.FORCED
        })
        const hasError = status === commandStatuses.ERROR

        const updatesUncolored = updates.map(cleanColors)
        const formattedUpdates = hasError ? updatesUncolored : updatesUncolored.map(getRawArgs)

        iframe.contentWindow.postMessage(
          {
            type: sandboxEvents.SANDBOX_COMMAND_RETURN,
            data: { updates: formattedUpdates, hasError }
          },
          '*'
        )
        break
      }

      case sandboxEvents.SANDBOX_COMMAND_UPDATE: {
        updates = [...updates, ...data.updates]

        iframe.contentWindow.postMessage(
          {
            type: sandboxEvents.SANDBOX_COMMAND_UPDATE_RETURN,
            data: { updates, hasError: false }
          },
          '*'
        )
        break
      }

      case sandboxEvents.SANDBOX_COMMAND_SET_UPDATE: {
        updates = [...data.updates]

        iframe.contentWindow.postMessage(
          {
            type: sandboxEvents.SANDBOX_COMMAND_SET_UPDATES_RETURN,
            data: { updates, hasError: false }
          },
          '*'
        )
        break
      }

      case sandboxEvents.SANDBOX_COMMAND_FINISH: {
        document.body.removeChild(iframe)
        window.removeEventListener('message', handleCodeEval)

        if (data.error) reject(data.error)
        else resolve(updates)
        break
      }
    }
  }

  iframe.onload = () => {
    window.addEventListener('message', handleCodeEval)

    iframe.contentWindow.postMessage(
      { type: sandboxEvents.SANDBOX_CODE, data: { code: script } },
      '*'
    )
  }
}
