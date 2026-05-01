import processManager from '@src/libs/process-manager'

import { commandStatuses, origins } from '@src/constants/command.constants'
import { sandboxEvents } from '@src/constants/sandbox.constants'
import { buildArgsFromProps } from '@src/helpers/arguments.helpers'
import { flatLogs } from '@src/helpers/command.helpers'

export default async (resolve, reject, data) => {
  const { code, props, addonNames } = data

  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', chrome.runtime.getURL('sandbox.html'))
  iframe.setAttribute('style', 'display: none;')
  document.body.appendChild(iframe)

  let logs = []

  const handleCodeEval = async event => {
    const type = event.data?.type
    const data = event.data?.data

    switch (type) {
      case sandboxEvents.COMMAND: {
        const { logs, status } = await processManager.executeCommand({
          line: buildArgsFromProps(data.props, data.name).join(' '),
          origin: origins.ADDON
        })
        const hasError = status === commandStatuses.ERROR
        const plainLogs = flatLogs(logs, { keepColors: false })

        iframe.contentWindow.postMessage(
          { type: sandboxEvents.COMMAND_RETURN, data: { logs: plainLogs, hasError } },
          '*'
        )
        break
      }

      case sandboxEvents.COMMAND_UPDATE: {
        logs = [...logs, ...data.logs]

        iframe.contentWindow.postMessage(
          { type: sandboxEvents.COMMAND_UPDATE_RETURN, data: { logs, hasError: false } },
          '*'
        )
        break
      }

      case sandboxEvents.COMMAND_CLEAR_UPDATES: {
        logs = []

        iframe.contentWindow.postMessage(
          {
            type: sandboxEvents.COMMAND_CLEAR_UPDATES_RETURN,
            data: { logs, hasError: false }
          },
          '*'
        )
        break
      }

      case sandboxEvents.COMMAND_FINISH: {
        document.body.removeChild(iframe)
        window.removeEventListener('message', handleCodeEval)

        if (data.error) reject(data.error)
        else resolve(logs)
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
