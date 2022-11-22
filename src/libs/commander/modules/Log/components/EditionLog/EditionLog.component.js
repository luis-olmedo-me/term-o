import * as React from 'preact'
import { useState } from 'preact/hooks'

import { Editor, languages } from 'modules/components/Editor'
import { Diskette, Home } from 'modules/icons'
import { parameterTypes } from '../../../../constants/commands.constants'
import LogCard from '../LogCard'

export const EditionLog = ({ editingValue, onReject, onApprove, command }) => {
  const [value, setValue] = useState(editingValue)
  const [isInvalid, setIsInvalid] = useState(false)

  const handleApproval = () => {
    let result

    try {
      result = JSON.stringify(JSON.parse(value))
      setIsInvalid(false)
    } catch {
      setIsInvalid(true)
      return
    }

    onApprove(result.trim())
  }

  const editionActions = [
    {
      id: `reject`,
      text: <Home />,
      onClick: () => onReject(value)
    },
    {
      id: `approve`,
      text: <Diskette />,
      onClick: handleApproval,
      invalid: isInvalid
    }
  ]

  return (
    <LogCard
      variant={parameterTypes.CODE}
      actions={editionActions}
      command={command}
      hasScroll
      hasShadow
    >
      <Editor
        value={value}
        language={languages.JSON}
        onChange={event => setValue(event.target.value)}
      />
    </LogCard>
  )
}
