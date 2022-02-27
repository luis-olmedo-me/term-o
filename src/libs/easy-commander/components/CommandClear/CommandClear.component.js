import { useEffect } from 'react'

export const CommandClear = ({ clearTerminal }) => {
  useEffect(clearTerminal, [clearTerminal])

  return null
}
