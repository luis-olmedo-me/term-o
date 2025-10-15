import { defaultConfigSections } from '@src/constants/config.constants'

export const sidePanelOptions = defaultConfigSections.map(section => ({
  id: section.id,
  name: section.name
}))
