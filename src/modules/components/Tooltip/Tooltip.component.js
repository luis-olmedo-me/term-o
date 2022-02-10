import React from 'react'

export const Tooltip = ({ content, contentTriggered }) => {
  return (
    <>
      <div>{contentTriggered}</div>
      <div>{content}</div>
    </>
  )
}
