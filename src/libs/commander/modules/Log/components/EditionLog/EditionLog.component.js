import * as React from 'preact'
import { useState } from 'preact/hooks'

import { Editor, languages } from 'modules/components/Editor'
import { CloseBorder, TickBorder } from 'modules/icons'
import { parameterTypes } from '../../../../constants/commands.constants'
import { Log } from '../../Log.component'

export const EditionLog = ({ editingValue, onReject, onApprove }) => {
  const [value, setValue] = useState(editingValue)

  const editionActions = [
    {
      id: `approve`,
      text: <TickBorder />,
      onClick: () => onApprove(value)
    },
    {
      id: `reject`,
      text: <CloseBorder />,
      onClick: () => onReject(value)
    }
  ]

  return (
    <Log variant={parameterTypes.TABLE} actionGroups={editionActions} hasScroll>
      <Editor value={value} language={languages.JSON} onChange={setValue} />
    </Log>
  )
}
