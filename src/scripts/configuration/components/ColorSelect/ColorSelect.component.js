import * as React from 'preact'

import Select from '../Select'

export const ColorSelect = ({ value, onChange, name, options }) => {
  return <Select options={options} value={value} onChange={onChange} name={name} />
}

ColorSelect.propTypes = {
  value: String,
  name: String,
  onChange: Function,
  options: Array
}
