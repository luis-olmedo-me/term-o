import ConfigApi from '@src/templates/ConfigApi'
import SimpleApi from '@src/templates/SimpleApi'

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
    defaultValue: [],
    Template: SimpleApi
  },
  {
    key: storageKeys.CONFIG,
    namespace: storageNamespaces.LOCAL,
    defaultValue: defaultConfig,
    Template: ConfigApi
  },
  {
    key: storageKeys.EVENTS,
    namespace: storageNamespaces.LOCAL,
    defaultValue: [],
    Template: SimpleApi
  },
  {
    key: storageKeys.SCRIPTS,
    namespace: storageNamespaces.LOCAL,
    defaultValue: [],
    Template: SimpleApi
  },
  {
    key: storageKeys.HISTORY,
    namespace: storageNamespaces.SESSION,
    defaultValue: [],
    Template: SimpleApi
  },
  {
    key: storageKeys.PROMPT_HISTORY,
    namespace: storageNamespaces.LOCAL,
    defaultValue: [],
    Template: SimpleApi
  },
  {
    key: storageKeys.COLOR_SETS,
    namespace: storageNamespaces.LOCAL,
    defaultValue: [defaultColorTheme],
    Template: SimpleApi
  }
]

export const storageDefaultValues = storageValues.reduce((values, value) => {
  return { ...values, [value.key]: value.defaultValue }
}, {})
