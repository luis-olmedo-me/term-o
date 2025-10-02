import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import Select from '../Select'

export const FontSelect = ({ value, onChange }) => {
  const [options, setOptions] = useState([])
  setOptions

  useEffect(function getColorThemes() {
    const updateOptions = async () => {
      // const newOptions = chrome.fontSettings.getFontList()
      // console.log('💬 ~ newOptions:', newOptions)
      // setOptions(newOptions)
    }

    updateOptions()
  }, [])

  return <Select options={options} value={value} onChange={onChange} />
}

FontSelect.propTypes = {
  value: String,
  onChange: Function
}
