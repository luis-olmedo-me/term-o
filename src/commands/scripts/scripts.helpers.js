import { getQuotedString } from '@src/helpers/utils.helpers'
import commandParser from '@src/libs/command-parser'

export const uploadFile = () => {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('accept', '.termo.js')

    const cancel = () => {
      fileInput.removeEventListener('change', receiveFile)
      fileInput.removeEventListener('cancel', cancel)
      fileInput.remove()

      reject('No file was uploaded.')
    }
    const receiveFile = event => {
      const [file] = Array.from(event.currentTarget.files)
      const fileName = getQuotedString(file.name)

      if (!file) cancel()

      if (file.name.endsWith('.termo.js')) resolve(file)
      else
        reject(
          `Invalid file extension. "*.termo.js" was expected. Instead, it received ${fileName}`
        )
    }

    fileInput.addEventListener('change', receiveFile)
    fileInput.addEventListener('cancel', cancel)

    fileInput.click()
  })
}

export const readFileContent = file => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.addEventListener('load', () => {
      resolve(fileReader.result)
    })

    fileReader.addEventListener('error', () => {
      reject('There was an error reading the file content.')
    })

    fileReader.readAsText(file)
  })
}

export const executeCode = ({ scriptContent, command }) => {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', chrome.runtime.getURL('sandbox.html'))
    iframe.setAttribute('style', 'display: none;')
    document.body.appendChild(iframe)

    const handleCodeEval = async function (event) {
      const type = event.data?.type
      const data = event.data?.data

      switch (type) {
        case 'sandbox-command': {
          const newCommand = commandParser
            .getTemplateByName(data.name)
            .create(commandParser.executionContext)

          newCommand.mock(data.props)

          if (!newCommand.finished) await newCommand.execute()

          iframe.contentWindow.postMessage(
            {
              type: 'sandbox-command-return',
              data: { updates: newCommand.cleanUpdates, hasError: newCommand.failed }
            },
            '*'
          )
          break
        }

        case 'sandbox-command-update': {
          command.update(...data.updates)
          break
        }

        case 'sandbox-command-set-updates': {
          command.setUpdates(...data.updates)
          break
        }

        case 'sandbox-command-finish': {
          document.body.removeChild(iframe)
          window.removeEventListener('message', handleCodeEval)

          if (data.error) reject(data.error)
          else resolve()

          break
        }
      }
    }

    iframe.onload = () => {
      window.addEventListener('message', handleCodeEval)

      iframe.contentWindow.postMessage({ type: 'sandbox-code', data: { code: scriptContent } }, '*')
    }
    iframe.onerror = () => {
      reject('error')
    }
  })
}
