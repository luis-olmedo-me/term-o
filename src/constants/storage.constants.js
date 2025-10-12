import { defaultConfigSections } from './config.constants'

export const storageKeys = {
  ALIASES: 'aliases',
  CONFIG: 'config',
  EVENTS: 'events',
  SCRIPTS: 'scripts',
  HISTORY: 'history',
  PROMPT_HISTORY: 'prompt-history',
  COLOR_SETS: 'color-sets'
}

export const storageNamespaces = {
  LOCAL: 'local',
  SESSION: 'session',
  COOKIE: 'cookie'
}

export const storageValues = [
  {
    key: storageKeys.ALIASES,
    namespace: storageNamespaces.LOCAL,
    default: []
  },
  {
    key: storageKeys.CONFIG,
    namespace: storageNamespaces.LOCAL,
    default: defaultConfigSections
  },
  {
    key: storageKeys.EVENTS,
    namespace: storageNamespaces.LOCAL,
    default: []
  },
  {
    key: storageKeys.SCRIPTS,
    namespace: storageNamespaces.LOCAL,
    default: []
  },
  {
    key: storageKeys.HISTORY,
    namespace: storageNamespaces.SESSION,
    default: []
  },
  {
    key: storageKeys.PROMPT_HISTORY,
    namespace: storageNamespaces.LOCAL,
    default: []
  },
  {
    key: storageKeys.COLOR_SETS,
    namespace: storageNamespaces.LOCAL,
    default: []
  }
]

export const storageDefaultValues = storageValues.reduce((values, value) => {
  return { ...values, [value.key]: value.default }
}, {})
