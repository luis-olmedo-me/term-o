import React from 'react'

export const Dom = ({ id, get, values }) => {
  return (
    <div>
      <p>dom {values?.join(' ')}</p>
      <p>element-output</p>
    </div>
  )
}
