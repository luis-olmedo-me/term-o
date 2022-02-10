import React, { useState } from 'react'
import { TooltipContentTriggered, TooltipTrigger } from './Tooltip.styles'

export const Tooltip = ({ content, contentTriggered }) => {
  const [isHidden, setIsHidden] = useState(true)

  return (
    <TooltipTrigger>
      {!isHidden && (
        <TooltipContentTriggered>{contentTriggered}</TooltipContentTriggered>
      )}

      <div
        onMouseEnter={() => setIsHidden(false)}
        onMouseLeave={() => setIsHidden(true)}
      >
        {content}
      </div>
    </TooltipTrigger>
  )
}
