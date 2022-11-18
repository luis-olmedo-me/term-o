import { Error, Tick } from 'modules/icons'
import * as React from 'preact'

export const useEdition = ({ onAccept, onReject }) => {
  const editionActions = [
    {
      id: `accept`,
      text: <Tick />,
      onClick: onAccept
    },
    {
      id: `reject`,
      text: <Error />,
      onClick: onReject
    }
  ]

  return { editionActions }
}
