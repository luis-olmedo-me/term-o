import { useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { helpActionTypes } from './CommandHelp.constants'
import { getActionType } from './CommandHelp.helpers'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'

export const CommandHelp = ({
  props,
  terminal: { command, setMessageData }
}) => {
  const actionType = getActionType(props)

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case helpActionTypes.HELP:
          console.log('helping')
          break

        case helpActionTypes.NONE:
          console.log('default')
          break
      }
    },
    [actionType]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.INFO}>coso</LogWrapper>
    </>
  )
}
