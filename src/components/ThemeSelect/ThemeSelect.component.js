import * as React from 'preact'
import { useMemo } from 'preact/hooks'

import Select from '@src/components/Select'
import useStorage from '@src/hooks/useStorage'

import { storageKeys } from '@src/constants/storage.constants'

export const ThemeSelect = ({ value, onChange, name }) => {
  const [colorThemes] = useStorage({ key: storageKeys.COLOR_SETS })

  const options = useMemo(
    () => colorThemes.map(theme => ({ id: theme.name, name: theme.name })),
    [colorThemes]
  )

  return <Select options={options} value={value} onChange={onChange} name={name} />
}

ThemeSelect.propTypes = {
  value: String,
  name: String,
  onChange: Function
}
