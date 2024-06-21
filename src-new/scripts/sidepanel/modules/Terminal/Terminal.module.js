import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import Input from '@sidepanel/components/Input'
import Logger from '@sidepanel/modules/Logger'
import * as S from './Terminal.styles'

const mockedLogs = [
  {
    id: 0,
    command: 'dom -g *'
  }
]
let id = 1

export const Terminal = () => {
  const [value, setValue] = useState('')
  const [logs, setLogs] = useState(mockedLogs)
  const inputRef = useRef(null)

  const focusOnInput = () => {
    inputRef.current.focus()
  }

  const handleChange = event => {
    const value = event.target.value

    setValue(value)
  }
  const handleKeyDown = event => {
    const key = event.key

    if (key === 'Enter') {
      setLogs([
        ...logs,
        {
          id: ++id,
          command: value
        }
      ])
      setValue('')
      focusOnInput()
    }
  }

  useEffect(function focusOnInputAtFirstTime() {
    focusOnInput()
  }, [])

  return (
    <S.TerminalWrapper onClick={focusOnInput}>
      <Logger logs={logs} />

      <Input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        prefix="$"
        inputRef={inputRef}
      />
    </S.TerminalWrapper>
  )
}
