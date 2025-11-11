import StorageCommandQueue from '@src/templates/StorageCommandQueue'
import StorageConfig from '@src/templates/StorageConfig'
import StorageSimple from '@src/templates/StorageSimple'
import StorageTab from '@src/templates/StorageTab'

import { defaultConfig } from './config.constants'
import { defaultColorTheme } from './themes.constants'

export const storageKeys = {
  ALIASES: 'aliases',
  CONFIG: 'config',
  EVENTS: 'events',
  SCRIPTS: 'scripts',
  HISTORY: 'history',
  PROMPT_HISTORY: 'prompt-history',
  THEMES: 'themes',
  TAB: 'tab',
  COMMAND_QUEUE: 'commandQueue'
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
    Template: StorageSimple
  },
  {
    key: storageKeys.CONFIG,
    namespace: storageNamespaces.LOCAL,
    defaultValue: defaultConfig,
    Template: StorageConfig
  },
  {
    key: storageKeys.EVENTS,
    namespace: storageNamespaces.LOCAL,
    defaultValue: [],
    Template: StorageSimple
  },
  {
    key: storageKeys.SCRIPTS,
    namespace: storageNamespaces.LOCAL,
    defaultValue: [],
    Template: StorageSimple
  },
  {
    key: storageKeys.HISTORY,
    namespace: storageNamespaces.SESSION,
    defaultValue: [],
    Template: StorageSimple
  },
  {
    key: storageKeys.PROMPT_HISTORY,
    namespace: storageNamespaces.LOCAL,
    defaultValue: [],
    Template: StorageSimple
  },
  {
    key: storageKeys.THEMES,
    namespace: storageNamespaces.LOCAL,
    defaultValue: [defaultColorTheme],
    Template: StorageSimple
  },
  {
    key: storageKeys.TAB,
    namespace: storageNamespaces.SESSION,
    defaultValue: null,
    Template: StorageTab
  },
  {
    key: storageKeys.COMMAND_QUEUE,
    namespace: storageNamespaces.SESSION,
    defaultValue: [],
    Template: StorageCommandQueue
  }
]
