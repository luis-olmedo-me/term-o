import * as React from 'preact'
import { dot } from './ColorDot.module.scss'

export const ColorDot = ({ option }) => {
  return <span className={dot} data-bg-color={option.id}></span>
}

ColorDot.propTypes = {
  option: String
}
