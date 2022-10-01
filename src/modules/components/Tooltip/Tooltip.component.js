import * as React from 'react'
import { useState } from 'react'
import { TooltipContentTriggered, TooltipTrigger } from './Tooltip.styles'

export const Tooltip = ({
  content,
  contentTriggered,
  side,
  isOpen,
  className
}) => {
  return (
    <TooltipTrigger className='tooltip-wrapper'>
      {isOpen && (
        <TooltipContentTriggered className={side}>
          {contentTriggered}
        </TooltipContentTriggered>
      )}

      <div>{content}</div>
    </TooltipTrigger>
  )
}
