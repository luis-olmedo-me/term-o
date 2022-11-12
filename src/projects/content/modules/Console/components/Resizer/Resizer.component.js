import * as React from 'preact'

import { ResizerWrapper } from './Resizer.styles'

export const Resizer = ({ resizeType, setResizingFrom }) => {
  return (
    <ResizerWrapper
      className={resizeType}
      onMouseDown={() => setResizingFrom(resizeType)}
      onMouseUp={() => setResizingFrom('')}
    />
  )
}
