import { useMemo } from 'preact/hooks'

import Select from '@src/components/Select'
import useStorage from '@src/hooks/useStorage'

import { storageKeys } from '@src/constants/storage.constants'

export const ThemeSelect = ({ value, onChange, name }) => {
  const [colorThemes] = useStorage({ key: storageKeys.THEMES })

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
