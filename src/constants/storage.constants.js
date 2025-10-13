import { defaultConfig } from './config.constants'
import { defaultColorTheme } from './themes.constants'

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
    defaultValue: []
  },
  {
    key: storageKeys.CONFIG,
    namespace: storageNamespaces.LOCAL,
    defaultValue: defaultConfig
  },
  {
    key: storageKeys.EVENTS,
    namespace: storageNamespaces.LOCAL,
    defaultValue: []
  },
  {
    key: storageKeys.SCRIPTS,
    namespace: storageNamespaces.LOCAL,
    defaultValue: []
  },
  {
    key: storageKeys.HISTORY,
    namespace: storageNamespaces.SESSION,
    defaultValue: []
  },
  {
    key: storageKeys.PROMPT_HISTORY,
    namespace: storageNamespaces.LOCAL,
    defaultValue: []
  },
  {
    key: storageKeys.COLOR_SETS,
    namespace: storageNamespaces.LOCAL,
    defaultValue: [defaultColorTheme]
  }
]

export const storageDefaultValues = storageValues.reduce((values, value) => {
  return { ...values, [value.key]: value.defaultValue }
}, {})
