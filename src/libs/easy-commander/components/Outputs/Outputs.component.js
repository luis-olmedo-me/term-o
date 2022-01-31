import React, { useEffect, useState } from 'react'
import { Element } from '../Element/Element.component'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { ElementsWrapper, MoreContentButton } from './Outputs.styles'

export const Outputs = ({ components }) => {
  return (
    <div className='wrapper-loco'>
      {components.map((component) => component({}))}
    </div>
  )
}
