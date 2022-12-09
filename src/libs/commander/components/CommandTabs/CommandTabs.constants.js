import { defaultCellActionIds } from 'modules/components/Table'
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
      key: 'go',
      description: 'Move between back or forward over the visited pages',
      type: optionTypes.NUMBER,
      defaultValue: 0,
      alias: 'g'
    }
  ],
  output: CommandTabs
}

export const tabsActionTypes = {
  SHOW_CURRENT_TABS: 'SHOW_CURRENT_TABS',
  SHOW_HISTORY: 'SHOW_HISTORY',
  REDIRECT: 'REDIRECT',
  KILL_TAB: 'KILL_TAB',
  RELOAD_TAB: 'RELOAD_TAB',
  GO: 'GO',
  NONE: 'NONE'
}

export const tabsHeaderIds = {
  ID: 'id',
  DATE: 'date',
  TITLE: 'title',
  HOSTNAME: 'hostname'
}
export const tabsTableOptions = {
  columns: [
    {
      id: tabsHeaderIds.ID,
      displayName: 'ID',
      width: '5%',
      minTableWidth: 900,
      field: 'id',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: tabsHeaderIds.DATE,
      displayName: 'Date',
      width: '25%',
      minTableWidth: 0,
      field: 'date',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: tabsHeaderIds.TITLE,
      displayName: 'Title',
      width: '40%',
      minTableWidth: 0,
      field: 'url',
      cellRenderer: 'imageIcon',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: tabsHeaderIds.HOSTNAME,
      displayName: 'Host Name',
      width: '15%',
      minTableWidth: 665,
      field: 'hostname',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    }
  ]
}

export const MAX_ITEMS = 10
