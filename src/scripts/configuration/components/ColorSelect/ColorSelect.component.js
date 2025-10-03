import * as React from 'preact'

import Select from '../Select'
import { ColorDot } from '../Select/OptionPrefixes'

export const ColorSelect = ({ value, onChange, name, options }) => {
  return (
    <Select
      OptionPrefix={({ option }) => <ColorDot color={option.id} />}
      options={options}
      value={value}
      onChange={onChange}
      name={name}
    />
  )
}

ColorSelect.propTypes = {
  value: String,
  name: String,
  onChange: Function,
  options: Array
}
