import { useEffect } from 'react'

export const CommandClear = ({ terminal: { clearTerminal } }) => {
  useEffect(clearTerminal, [clearTerminal])

  return null
}
