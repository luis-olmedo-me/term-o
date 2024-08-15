import { displayHelp, formatAlias } from '../handlers.helpers'

export const handleSCRIPTS = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const { scripts = [] } = await chrome.storage.local.get('scripts')
    const updates = scripts.map(formatAlias)

    command.update(...updates)
  }

  if (P`add`.length) {
    const [key, value] = P`add`
    const newScript = { key, value }

    const { scripts = [] } = await chrome.storage.local.get('scripts')
    const alreadyExists = scripts.some(script => script.key === key)

    if (alreadyExists) {
      return command.throw(`The script "${key}" already exists.`)
    }

    const newScripts = scripts.concat(newScript)
    const update = formatAlias(newScript)

    await chrome.storage.local.set({ aliases: newScripts })
    command.update(update)
  }

  if (P`upload`) {
    // test
  }

  if (P`delete`) {
    const key = P`delete`

    const { scripts = [] } = await chrome.storage.local.get('scripts')
    const existingScript = scripts.find(script => script.key === key)

    if (!existingScript) {
      return command.throw(`The script "${key}" does not exist.`)
    }

    const newScripts = scripts.filter(script => script.key !== key)
    const update = formatAlias(existingScript)

    await chrome.storage.local.set({ aliases: newScripts })
    command.update(update)
  }

  if (P`help`) displayHelp(command)
}
