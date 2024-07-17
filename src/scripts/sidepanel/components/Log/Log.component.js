import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { MAX_LINES_PER_COMMAND } from '@sidepanel/config'
import ColoredText from '../ColoredText'
import Prompt from '../Prompt'
import * as S from './Log.styles'

export const Log = ({ command, onUpdate }) => {
  const [updates, setUpdates] = useState(command.updates)
  const wrapper = useRef(null)

  useEffect(
    function listenUpdates() {
      const handleUpdate = ({ updates: newUpdates }) => {
        if (onUpdate) onUpdate()
        const limitedUpdates = newUpdates.slice(MAX_LINES_PER_COMMAND * -1)

        setUpdates(limitedUpdates)
      }

      handleUpdate(command)
      command.addEventListener('update', handleUpdate)
      if (!command.finished) command.execute()

      return () => command.removeEventListener('update', handleUpdate)
    },
    [command, onUpdate]
  )

  return (
    <S.LogWrapper ref={wrapper}>
      <Prompt tab={command.data.tab} defaultValue={command.title} disabled />

      {updates.map((update, index) => {
        return (
          <S.LogItem key={index}>
            <ColoredText value={update} />
          </S.LogItem>
        )
      })}
    </S.LogWrapper>
  )
}

Log.propTypes = {
  command: Object,
  onUpdate: Function
}
