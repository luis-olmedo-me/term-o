import * as React from 'preact'

import themer from '@src/libs/themer'
import Select from '../Select'

export const ThemeSelect = ({ value, onChange }) => {
  const options = themer.colorThemes.map(theme => ({ id: theme.name, name: theme.name }))

  return <Select options={options} value={value} onChange={onChange} />
}

ThemeSelect.propTypes = {
  value: String,
  onChange: Function
}
