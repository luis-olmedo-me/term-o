import React, { useEffect, useState } from 'react'
import { OutputWrapper } from './Outputs.styles'

export const Outputs = ({ components }) => {
  return (
    <OutputWrapper className='wrapper-loco'>
      {components.map((component) => component({}))}
    </OutputWrapper>
  )
}
