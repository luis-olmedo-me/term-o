import * as React from 'preact'
import { Box } from './Checkbox.styles'

export const Checkbox = ({ checked, onChange }) => {
  return <Box className={checked ? 'checked' : ''} onClick={onChange} />
}
