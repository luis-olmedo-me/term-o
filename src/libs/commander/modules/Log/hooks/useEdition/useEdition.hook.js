import { CloseBorder, Diskette } from 'modules/icons'
import * as React from 'preact'

export const useEdition = ({ onAccept, onReject }) => {
  const editionActions = [
    {
      id: `accept`,
      text: <Diskette />,
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
