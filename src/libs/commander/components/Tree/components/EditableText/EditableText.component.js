import React from 'react'
import { TextInput } from './EditableText.styles'

export const EditableText = ({ title }) => {
  const [value, setValue] = React.useState(title)
  const [isEditing, setIsEditing] = React.useState(false)

  const handleKeyPress = (event) => {
    event.stopPropagation()

    if (event.key === 'Enter') {
      setValue(event.target.value)
      setIsEditing(false)
    }
    if (event.key === 'Escape') {
      setIsEditing(false)
    }
  }

  return isEditing ? (
    <TextInput
      type='text'
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyPress={handleKeyPress}
      onMouseDown={(event) => event.stopPropagation()}
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{title}</span>
  )
}
