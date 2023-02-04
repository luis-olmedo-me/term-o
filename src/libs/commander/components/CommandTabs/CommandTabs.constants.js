import * as React from 'preact'

import { updateTab, updateWindow } from '@helpers/event.helpers'
import ImageIcon from '@modules/components/ImageIcon'
import { defaultCellActionIds } from '@modules/components/Table'
import { Open } from '@modules/icons'
import { optionTypes } from '../../constants/commands.constants'
import { CommandTabs } from './CommandTabs.component'

export const tabsConfig = {
  props: [
    {
      key: 'now',
      description: 'Show all tabs open',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'n'
    },
    {
      key: 'past',
      description: 'Show past tabs',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'p'
    },
    {
      key: 'byText',
      description: 'Get tabs by title or url',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'bt'
    },
    {
      key: 'byStartDate',
      description: 'Get tabs history from start date',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'bsd'
    },
    {
      key: 'byEndDate',
      description: 'Get tabs history from end date',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'bed'
    },
    {
      key: 'byDate',
      description: 'Get tabs history by date',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'bd'
    },
    {
      key: 'maxResults',
      description: 'Limit the amount of tabs shown',
      type: optionTypes.NUMBER,
      defaultValue: 500,
      alias: 'mr'
    },
    {
      key: 'incognito',
      description: 'Get tabs open in incognito mode',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'i'
    },
    {
      key: 'here',
      description: 'Get open tabs in the current window',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'h'
    },
    {
      key: 'open',
      description: 'Go to a specific url (URL)',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'o'
    },
    {
      key: 'close',
      description: 'Close tabs by their ids',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'c'
    },
    {
      key: 'reload',
      description: 'Reload current tab',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'r'
    },
    {
      key: 'useCurrent',
      description: 'Use current tab to open an URL',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'uc'
    },
    {
      key: 'permissions',
      description: 'Show tab permissions',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'P'
    },
    {
      key: 'go',
      description: 'Move between back or forward over the visited pages',
      type: optionTypes.NUMBER,
      defaultValue: 0,
      alias: 'g'
    },
    {
      key: 'togglePermission',
      description: 'Toggle permission for current tab',
      type: optionTypes.OBJECT,
      objectTypes: ['boolean'],
      defaultValue: {},
      alias: 'tp'
    },
    {
      key: 'switch',
      description: 'Switch tab in view',
      type: optionTypes.NUMBER,
      defaultValue: NaN,
      alias: 's'
    }
  ],
  output: CommandTabs
}

export const tabsActionTypes = {
  SHOW_CURRENT_TABS: 'SHOW_CURRENT_TABS',
  SHOW_HISTORY: 'SHOW_HISTORY',
  SHOW_PERMISSIONS: 'SHOW_PERMISSIONS',
  TOGGLE_PERMISSIONS: 'TOGGLE_PERMISSIONS',
  REDIRECT: 'REDIRECT',
  KILL_TAB: 'KILL_TAB',
  RELOAD_TAB: 'RELOAD_TAB',
  GO: 'GO',
  SWITCH: 'SWITCH',
  NONE: 'NONE'
}

export const tabsCellActionIds = {
  SWITCH: 'switch'
}
export const tableCellActions = [
  {
    id: tabsCellActionIds.SWITCH,
    title: 'Switch',
    onClick: ({ row }) => {
      updateTab({ tabId: row.id, props: { active: true } })
      if (!row.currentWindow) updateWindow({ windowId: row.windowId, props: { focused: true } })
    },
    Component: <Open />
  }
]

export const tableComponents = {
  imageIcon: ({ row }) => (
    <ImageIcon
      url={`https://www.google.com/s2/favicons?domain=${row.hostname}`}
      label={row.title}
    />
  )
}

export const MAX_ITEMS = 10

export const tabsColumnIds = {
  ID: 'id',
  DATE: 'date',
  TITLE: 'title',
  HOSTNAME: 'hostname'
}
export const currentTabsTableOptions = {
  columns: [
    {
      id: tabsColumnIds.ID,
      displayName: 'ID',
      width: '5%',
      minTableWidth: 900,
      field: 'id',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: tabsColumnIds.DATE,
      displayName: 'Date',
      width: '25%',
      minTableWidth: 0,
      field: 'date',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: tabsColumnIds.TITLE,
      displayName: 'Title',
      width: '40%',
      minTableWidth: 0,
      field: 'url',
      cellRenderer: 'imageIcon',
      actionIds: [defaultCellActionIds.COPY_VALUE, tabsCellActionIds.SWITCH]
    },
    {
      id: tabsColumnIds.HOSTNAME,
      displayName: 'Host Name',
      width: '15%',
      minTableWidth: 665,
      field: 'hostname',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    }
  ]
}
export const pastTabsTableOptions = {
  columns: [
    {
      id: tabsColumnIds.ID,
      displayName: 'ID',
      width: '5%',
      minTableWidth: 900,
      field: 'id',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: tabsColumnIds.DATE,
      displayName: 'Date',
      width: '25%',
      minTableWidth: 0,
      field: 'date',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: tabsColumnIds.TITLE,
      displayName: 'Title',
      width: '40%',
      minTableWidth: 0,
      field: 'url',
      cellRenderer: 'imageIcon',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: tabsColumnIds.HOSTNAME,
      displayName: 'Host Name',
      width: '15%',
      minTableWidth: 665,
      field: 'hostname',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    }
  ]
}

export const permissionColumnIds = {
  ID: 'id',
  NAME: 'name',
  STATE: 'state'
}
export const permissionTableOptions = {
  columns: [
    {
      id: permissionColumnIds.ID,
      displayName: 'ID',
      width: '33%',
      minTableWidth: 0,
      field: 'id',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: permissionColumnIds.NAME,
      displayName: 'Name',
      width: '33%',
      minTableWidth: 0,
      field: 'name',
      actionIds: []
    },
    {
      id: permissionColumnIds.STATE,
      displayName: 'State',
      width: '33%',
      minTableWidth: 0,
      field: 'enable',
      cellRenderer: 'switch',
      actionIds: []
    }
  ]
}

export const tabPermissionIds = {
  OPEN_TABS: 'open_tabs'
}

export const possibleTabPermissionIds = Object.values(tabPermissionIds)
