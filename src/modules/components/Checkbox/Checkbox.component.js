import * as React from 'preact'
import { Box } from './Checkbox.styles'

export const Checkbox = ({ checked, onChange, className }) => {
  return <Box className={`${checked ? 'checked' : ''} ${className}`} onClick={onChange} />
}
