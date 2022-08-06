import React from 'react'
import { TextInput } from './EditableText.styles'

export const EditableText = ({
  title,
  isEditionEnabled,
  onChange,
  showTitleWithQuotes
}) => {
  const [value, setValue] = React.useState(title)
  const [isEditing, setIsEditing] = React.useState(false)

  const handleKeyPress = (event) => {
    event.stopPropagation()

    if (event.key === 'Enter') {
      onChange(event.target.value)
      setIsEditing(false)
    }
    if (event.key === 'Escape') {
      setIsEditing(false)
    }
  }
  const valueCharacters = String(value).length

  return isEditing ? (
    <TextInput
      type='text'
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyPress={handleKeyPress}
      onMouseDown={(event) => event.stopPropagation()}
      style={{ width: `${valueCharacters + 2}ch` }}
    />
  ) : (
    <span onClick={isEditionEnabled ? () => setIsEditing(true) : null}>
      {showTitleWithQuotes ? `"${title}"` : title}
    </span>
  )
}
