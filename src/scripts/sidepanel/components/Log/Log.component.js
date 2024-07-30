import * as React from 'preact'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'

import useConfig from '@src/hooks/useConfig'
import ColoredText from '../ColoredText'
import Prompt from '../Prompt'
import * as S from './Log.styles'

export const Log = ({ command, onUpdate }) => {
  const [updates, setUpdates] = useState(command.updates)

  const wrapper = useRef(null)

  const { config, getConfigById } = useConfig()
  const maxLinesPerCommand = useMemo(() => getConfigById('terminal', 'max-lines-per-command'), [
    config
  ])

  useEffect(
    function listenUpdates() {
      const handleUpdate = ({ updates: newUpdates }) => {
        if (onUpdate) onUpdate()
        const limitedUpdates = newUpdates.slice(maxLinesPerCommand * -1)

        setUpdates(limitedUpdates)
      }

      handleUpdate(command)
      command.addEventListener('update', handleUpdate)
      if (!command.finished) command.execute()

      return () => command.removeEventListener('update', handleUpdate)
    },
    [command, onUpdate, maxLinesPerCommand]
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
