import React, { useState } from 'react'
import { Input } from './AttributeInput.styles'

export const AttributeInput = ({ onEnter, defaultValue, placeholder }) => {
  const [attribute, setAttribute] = useState(defaultValue)

  const handleAttributeKeyUp = (event) => {
    if (event.key === 'Enter') {
      onEnter(attribute)

      setAttrOriginalName('')
    }
  }

  return (
    <Input
      type='text'
      value={attribute}
      placeholder={placeholder}
      onChange={(event) => setAttribute(event.target.value)}
      onKeyUp={handleAttributeKeyUp}
    />
  )
}
