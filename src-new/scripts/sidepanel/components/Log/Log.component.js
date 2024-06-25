import * as React from 'preact'

import * as S from './Log.styles'

export const Log = ({ log, prefix }) => {
  return (
    !log.hidden && (
      <p>
        {prefix} {log.command}
      </p>
    )
  )
}
