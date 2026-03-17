import { useEffect, useState } from 'preact/hooks'

import TypedSelect from '@src/components/TypedSelect'
import processManager from '@src/libs/process-manager'

export const FontSelect = ({ value, onChange, name }) => {
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(function getColorThemes() {
    const updateOptions = async () => {
      const fonts = await processManager.getFontsAvailable()
      const newOptions = fonts.map(font => ({ id: font.fontId, name: font.displayName }))

      setOptions(newOptions)
      setIsLoading(false)
    }

    updateOptions()
  }, [])

  return (
    <TypedSelect
      loading={isLoading}
      options={options}
      value={value}
      onChange={onChange}
      name={name}
    />
  )
}

FontSelect.propTypes = {
  value: String,
  name: String,
  onChange: Function
}
