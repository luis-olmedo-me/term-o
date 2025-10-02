import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { getFontsAvailable } from '@src/processes/processes'
import Select from '../Select'

export const FontSelect = ({ value, onChange }) => {
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(function getColorThemes() {
    const updateOptions = async () => {
      const fonts = await getFontsAvailable()
      const newOptions = fonts.map(font => ({ id: font.fontId, name: font.displayName }))

      setOptions(newOptions)
      setIsLoading(false)
    }

    updateOptions()
  }, [])

  return <Select loading={isLoading} options={options} value={value} onChange={onChange} />
}

FontSelect.propTypes = {
  value: String,
  onChange: Function
}
