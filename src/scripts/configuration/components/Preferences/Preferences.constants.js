import { defaultConfigSections } from '@src/hooks/useConfig'

export const sidePanelOptions = defaultConfigSections.map(section => ({
  id: section.id,
  name: section.name
}))
