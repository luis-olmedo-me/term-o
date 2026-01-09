import { deleteStorageValue, getStorageValue, setStorageValue } from '@src/browser-api/storage.api'
import { storageKeys } from '@src/constants/storage.constants'
import processManager from '@src/libs/process-manager'
import CommandBase from '@src/templates/CommandBase'
import StorageSimple from '@src/templates/StorageSimple'

export class StorageAddons extends StorageSimple {
  get $value() {
    return {
      values: this.$latest().value,
      delete: this.delete.bind(this),
      getMetadata: this.getMetadata.bind(this),
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

  async asCommands() {
    const commands = []

    for (const addon of this.$latest().value) {
      const handler = await getStorageValue(this.$namespace, `addon_${addon.name}_handler`)
      const commandBase = new CommandBase({
        name: addon.name,
        helpSectionTitles: [],
        handler: async command => {
          const updates = await processManager.executeCode({ script: handler })

          command.setUpdates(...updates)
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
          helpSection: null,
          validate: null
        })
      })

      commands.push(commandBase)
    }

    return commands
  }

  getMetadata(name) {
    return this.$latest().value.find(addon => addon.name === name)
  }

  has(name) {
    return this.$latest().value.some(addon => addon.name === name)
  }
}
