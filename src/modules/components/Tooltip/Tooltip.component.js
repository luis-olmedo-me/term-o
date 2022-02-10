import React, { useState } from 'react'
import { TooltipContentTriggered } from './Tooltip.styles'

export const Tooltip = ({ content, contentTriggered }) => {
  const [isHidden, setIsHidden] = useState(true)

  return (
    <>
      {isHidden && (
        <TooltipContentTriggered>{contentTriggered}</TooltipContentTriggered>
      )}

      <div
        onMouseEnter={() => setIsHidden(false)}
        onMouseLeave={() => setIsHidden(true)}
      >
        {content}
      </div>
    </>
  )
}
