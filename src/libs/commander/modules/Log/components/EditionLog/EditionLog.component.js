import * as React from 'preact'

import { Editor, languages } from 'modules/components/Editor'
import { CloseBorder, TickBorder } from 'modules/icons'
import { parameterTypes } from '../../../../constants/commands.constants'
import { Log } from '../../Log.component'

export const EditionLog = ({ editingValue, onReject, onApprove }) => {
  const editionActions = [
    {
      id: `approve`,
      text: <TickBorder />,
      onClick: onApprove
    },
    {
      id: `reject`,
      text: <CloseBorder />,
      onClick: onReject
    }
  ]

  return (
    <Log variant={parameterTypes.TABLE} actionGroups={editionActions} hasScroll>
      <Editor value={editingValue} language={languages.JSON} />
    </Log>
  )
}
