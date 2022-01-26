import React from 'react'
import { commandNames } from '../commands.constants'

export const Dom = ({ id, get, values }) => {
  const valuesAsString = values?.join(' ')

  const command = `${commandNames.DOM} ${valuesAsString}`
  return (
    <div>
      <p>{command}</p>
      <p>element-output</p>
    </div>
  )
}
