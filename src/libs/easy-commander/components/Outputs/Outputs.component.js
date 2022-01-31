import React, { useEffect, useState } from 'react'
import { Element } from '../Element/Element.component'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { ElementsWrapper, MoreContentButton } from './Outputs.styles'

export const Outputs = ({ components }) => {
  console.log({ components })
  console.log({ components: components.map((component) => component({})) })

  return (
    <div className='wrapper-loco'>
      {components.map((component) => component({}))}
    </div>
  )
}
