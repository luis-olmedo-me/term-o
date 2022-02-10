import React, { useState } from 'react'
import { TooltipContentTriggered, TooltipTrigger } from './Tooltip.styles'

export const Tooltip = ({ content, contentTriggered, side }) => {
  const [isHidden, setIsHidden] = useState(true)

  return (
    <TooltipTrigger>
      {!isHidden && (
        <TooltipContentTriggered className={side}>
          {contentTriggered}
        </TooltipContentTriggered>
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
