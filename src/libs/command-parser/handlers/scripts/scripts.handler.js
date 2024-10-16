import { displayHelp, formatFile, formatScript } from '../handlers.helpers'
import { executeCode, readFileContent, uploadFile } from './scripts.helpers'

export const handleSCRIPTS = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const { scripts = [] } = await chrome.storage.local.get('scripts')
    const updates = scripts.map(formatScript)

    command.update(...updates)
  }

  if (P`upload`) {
    const file = await uploadFile()
    command.update('Reading uploaded file.')
    const fileContent = await readFileContent(file)
    const newScript = { name: file.name, content: fileContent }

    const { scripts = [] } = await chrome.storage.local.get('scripts')
    const alreadyExists = scripts.some(script => script.name === file.name)

    if (alreadyExists) {
      return command.throw(`The script "${file.name}" already exists.`)
    }

    const newScripts = scripts.concat(newScript)
    await chrome.storage.local.set({ scripts: newScripts })

    const update = formatFile(file)

    command.reset()
    command.update(update)
  }

  if (P`delete`) {
    const name = P`delete`

    const { scripts = [] } = await chrome.storage.local.get('scripts')
    const existingScript = scripts.find(script => script.name === name)

    if (!existingScript) {
      return command.throw(`The script "${name}" does not exist.`)
    }

    const newScripts = scripts.filter(script => script.name !== name)
    const update = formatScript(existingScript)

    await chrome.storage.local.set({ scripts: newScripts })
    command.update(update)
  }

  if (P`run`) {
    const name = P`run`
    const { scripts = [] } = await chrome.storage.local.get('scripts')
    const existingScript = scripts.find(script => script.name === name)

    if (!existingScript) {
      return command.throw(`The script "${name}" does not exist.`)
    }

    await executeCode({
      scriptContent: existingScript.content
    })
    command.update('Executed!')
  }

  if (P`help`) displayHelp(command)
}
