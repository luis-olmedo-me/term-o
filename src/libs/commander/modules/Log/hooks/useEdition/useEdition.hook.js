import { CloseBorder, TickBorder } from 'modules/icons'
import * as React from 'preact'

export const useEdition = ({ onAccept, onReject }) => {
  const editionActions = [
    {
      id: `accept`,
      text: <TickBorder />,
      onClick: onAccept
    },
    {
      id: `reject`,
      text: <CloseBorder />,
      onClick: onReject
    }
  ]

  return { editionActions }
}
