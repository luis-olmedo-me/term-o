import * as React from 'preact'
import { useState } from 'preact/hooks'

import { Input } from '../../components/Input/Input.component'
import Logger from '../../components/Logger'

export const Terminal = () => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    const value = event.target.value

    setValue(value)
  }

  return (
    <div>
      <Logger logs={[]} />

      <Input type="text" onChange={handleChange} value={value} prefix="$" />
    </div>
  )
}
