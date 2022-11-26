import { internalEventProperties } from 'libs/commander/constants/commands.constants'

export const internalEventTableOptions = {
  columns: [
    {
      id: internalEventProperties.ID,
      displayName: 'ID',
      width: '20%',
      minTableWidth: 555
    },
    {
      id: internalEventProperties.URL,
      displayName: 'URL',
      width: '15%',
      minTableWidth: 0
    },
    {
      id: internalEventProperties.EVENT,
      displayName: 'Event',
      width: '15%',
      minTableWidth: 700
    },
    {
      id: internalEventProperties.COMMAND,
      displayName: 'Command',
      width: '50%',
      minTableWidth: 0
    }
  ]
}
