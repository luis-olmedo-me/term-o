import StorageCommandQueue from '@src/templates/StorageCommandQueue'
import StorageConfig from '@src/templates/StorageConfig'
import StorageSimple from '@src/templates/StorageSimple'
import StorageTab from '@src/templates/StorageTab'

import StorageScripts from '@src/templates/StorageScripts'
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
  COOKIE: 'cookie',
  SYNC: 'sync'
}

export const storageKeysNonResetables = [storageKeys.TAB]

export const storageValues = [
  {
    key: storageKeys.ALIASES,
    namespace: storageNamespaces.SYNC,
    defaultValue: [],
    Template: StorageSimple,
    json: true
  },
  {
    key: storageKeys.CONFIG,
    namespace: storageNamespaces.SYNC,
    defaultValue: defaultConfig,
    Template: StorageConfig,
    json: true
  },
  {
    key: storageKeys.EVENTS,
    namespace: storageNamespaces.SYNC,
    defaultValue: [],
    Template: StorageSimple,
    json: true
  },
  {
    key: storageKeys.SCRIPTS,
    namespace: storageNamespaces.SYNC,
    defaultValue: [],
    Template: StorageScripts,
    json: true
  },
  {
    key: storageKeys.HISTORY,
    namespace: storageNamespaces.SESSION,
    defaultValue: [],
    Template: StorageSimple,
    json: true
  },
  {
    key: storageKeys.PROMPT_HISTORY,
    namespace: storageNamespaces.SYNC,
    defaultValue: [],
    Template: StorageSimple,
    json: true
  },
  {
    key: storageKeys.THEMES,
    namespace: storageNamespaces.SYNC,
    defaultValue: [defaultColorTheme],
    Template: StorageSimple,
    json: true
  },
  {
    key: storageKeys.TAB,
    namespace: storageNamespaces.SESSION,
    defaultValue: {},
    Template: StorageTab,
    json: true
  },
  {
    key: storageKeys.COMMAND_QUEUE,
    namespace: storageNamespaces.SESSION,
    defaultValue: [],
    Template: StorageCommandQueue,
    json: true
  }
]
