import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import themer from '@src/libs/themer'
import Select from '../Select'

export const ThemeSelect = ({ value, onChange, name }) => {
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(function getColorThemes() {
    const isInitiated = themer.isInitiated
    const updateOptions = ({ colorThemes }) => {
      const newOptions = colorThemes.map(theme => ({ id: theme.name, name: theme.name }))

      setOptions(newOptions)
      setIsLoading(false)
    }

    updateOptions(themer)

    themer.addEventListener('themes-update', updateOptions)
    if (!isInitiated) themer.addEventListener('init', updateOptions)

    return () => {
      themer.removeEventListener('themes-update', updateOptions)
      if (!isInitiated) themer.removeEventListener('init', updateOptions)
    }
  }, [])

  return (
    <Select loading={isLoading} options={options} value={value} onChange={onChange} name={name} />
  )
}

ThemeSelect.propTypes = {
  value: String,
  name: String,
  onChange: Function
}
