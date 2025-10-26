export default async (resolve, data) => {
  const { script } = data

  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', chrome.runtime.getURL('sandbox.html'))
  iframe.setAttribute('style', 'display: none;')
  document.body.appendChild(iframe)

  let updates = ['testing']

  const handleCodeEval = async function (event) {
    const type = event.data?.type
    const data = event.data?.data

    switch (type) {
      case 'sandbox-command': {
        // const { updates } = await executeCommand({
        //   line: buildLineFromProps(data.name, data.props)
        // })

        iframe.contentWindow.postMessage(
          {
            type: 'sandbox-command-return',
            data: { updates: [], hasError: false }
          },
          '*'
        )
        break
      }

      case 'sandbox-command-update': {
        updates = [...updates, ...data.updates]
        break
      }

      case 'sandbox-command-set-updates': {
        updates = [...data.updates]
        break
      }

      case 'sandbox-command-finish': {
        document.body.removeChild(iframe)
        window.removeEventListener('message', handleCodeEval.bind(this))

        resolve({ error: data.error, updates })

        break
      }
    }
  }

  iframe.onload = () => {
    window.addEventListener('message', handleCodeEval)

    iframe.contentWindow.postMessage({ type: 'sandbox-code', data: { code: script } }, '*')
  }
  iframe.onerror = () => {
    document.body.removeChild(iframe)
    window.removeEventListener('message', handleCodeEval)
    resolve(['error'])
  }
}
