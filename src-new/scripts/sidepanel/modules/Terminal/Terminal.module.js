import * as React from 'preact'
import { Input } from '../../components/Input/Input.component'
import Logger from '../../components/Logger'

export const Terminal = () => {
  const handleChange = () => {
    console.log('change')
  }

  return (
    <div>
      <Logger logs={[]} />

      <Input type="text" onChange={handleChange} placeholder="..." />
    </div>
  )
}
