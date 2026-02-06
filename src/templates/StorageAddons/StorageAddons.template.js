import processManager from '@src/libs/process-manager'
import CommandBase from '@src/templates/CommandBase'
import StorageSimple from '@src/templates/StorageSimple'

import { deleteStorageValue, getStorageValue, setStorageValue } from '@src/browser-api/storage.api'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'

export class StorageAddons extends StorageSimple {
  get $value() {
    return {
      values: this.$latest().value,
      delete: this.delete.bind(this),
      asCommands: this.asCommands.bind(this),
      add: this.add.bind(this),
      get: this.get.bind(this),
      has: this.has.bind(this)
    }
  }

  add({ name, version, handler, options }) {
    const newAddons = this.$latest().value.concat({ name, version, options })

    this.$storageService.set(storageKeys.ADDONS, newAddons)
    setStorageValue(this.$namespace, `addon_${name}_handler`, handler, false)
  }

  delete(name) {
    const newAddons = this.$latest().value.filter(addon => addon.name !== name)

    this.$storageService.set(storageKeys.ADDONS, newAddons)
    deleteStorageValue(this.$namespace, `addon_${name}_handler`, false)
  }

  async get(name) {
    const foundAddon = this.$latest().value.find(addon => addon.name === name)

    if (!foundAddon) return null

    return {
      name: foundAddon.name,
      version: foundAddon.version,
      options: foundAddon.options,
      handler: await getStorageValue(this.$namespace, `addon_${name}_handler`)
    }
  }

  asCommands(addonNames) {
    const namespace = this.$namespace

    return this.$latest().value.map(addon => {
      const commandBase = new CommandBase({
        name: addon.name,
        handler: async command => {
          const props = command.props

          if (props.help) return createHelpView(command)

          const code = await getStorageValue(namespace, `addon_${addon.name}_handler`)
          const updates = await processManager.executeCode({ code, props, addonNames })

          command.reset()
          command.update(...updates)
        }
      })

      addon.options.forEach(option => {
        commandBase.expect({
          name: option.name,
          abbreviation: option.abbreviation,
          type: option.type,
          description: option.description,
          worksWith: option.worksWith,
          mustHave: option.mustHave,
          defaultValue: option.defaultValue,
          helpSection: option.helpSection,
          validate: null
        })
      })

      return commandBase
    })
  }

  has(name) {
    return this.$latest().value.some(addon => addon.name === name)
  }
}
