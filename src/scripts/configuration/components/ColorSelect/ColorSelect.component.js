import * as React from 'preact'

import Select, { ColorDot } from '../Select'

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
