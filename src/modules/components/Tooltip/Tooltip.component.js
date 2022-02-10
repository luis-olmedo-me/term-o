import React, { useState } from 'react'
import { TooltipContentTriggered, TooltipTrigger } from './Tooltip.styles'

export const Tooltip = ({ content, contentTriggered }) => {
  const [isHidden, setIsHidden] = useState(true)

  return (
    <>
      {isHidden && (
        <TooltipContentTriggered>{contentTriggered}</TooltipContentTriggered>
      )}

      <TooltipTrigger
        onMouseEnter={() => setIsHidden(false)}
        onMouseLeave={() => setIsHidden(true)}
      >
        {content}
      </TooltipTrigger>
    </>
  )
}
