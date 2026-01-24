import processManager from '@src/libs/process-manager'

import { commandStatuses, origins } from '@src/constants/command.constants'
import { sandboxEvents } from '@src/constants/sandbox.constants'
import { buildArgsFromProps } from '@src/helpers/arguments.helpers'
import { makeLogSafe } from '@src/helpers/command.helpers'

export default async (resolve, reject, data) => {
  const { code, props, addonNames } = data

  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', chrome.runtime.getURL('sandbox.html'))
  iframe.setAttribute('style', 'display: none;')
  document.body.appendChild(iframe)

  let updates = []

  const handleCodeEval = async event => {
    const type = event.data?.type
    const data = event.data?.data

    switch (type) {
      case sandboxEvents.COMMAND: {
        const { updates, status } = await processManager.executeCommand({
          line: buildArgsFromProps(data.props, data.name).join(' '),
          origin: origins.FORCED
        })
        const hasError = status === commandStatuses.ERROR

        const updatesUncolored = makeLogSafe(updates, true)

        iframe.contentWindow.postMessage(
          { type: sandboxEvents.COMMAND_RETURN, data: { updates: updatesUncolored, hasError } },
          '*'
        )
        break
      }

      case sandboxEvents.COMMAND_UPDATE: {
        updates = [...updates, ...data.updates]

        iframe.contentWindow.postMessage(
          { type: sandboxEvents.COMMAND_UPDATE_RETURN, data: { updates, hasError: false } },
          '*'
        )
        break
      }

      case sandboxEvents.COMMAND_SET_UPDATES: {
        updates = data.updates

        iframe.contentWindow.postMessage(
          { type: sandboxEvents.COMMAND_SET_UPDATES_RETURN, data: { updates, hasError: false } },
          '*'
        )
        break
      }

      case sandboxEvents.COMMAND_CLEAR_UPDATES: {
        updates = []

        iframe.contentWindow.postMessage(
          { type: sandboxEvents.COMMAND_CLEAR_UPDATES_RETURN, data: { updates, hasError: false } },
          '*'
        )
        break
      }

      case sandboxEvents.COMMAND_FINISH: {
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
      { type: sandboxEvents.CODE, data: { code, props, addonNames } },
      '*'
    )
  }
}
