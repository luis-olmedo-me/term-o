import * as React from 'preact'
import { useState } from 'preact/hooks'
import { TextInput } from './EditableText.styles'

export const EditableText = ({
  title,
  isEditionEnabled,
  onChange,
  showTitleWithQuotes,
  className
}) => {
  const titleAsString = String(title)

  const [value, setValue] = useState(titleAsString)
  const [isEditing, setIsEditing] = useState(false)

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
      className={className}
    />
  ) : (
    <span
      onClick={isEditionEnabled ? () => setIsEditing(true) : null}
      className={className}
    >
      {showTitleWithQuotes ? `"${titleAsString}"` : titleAsString}
    </span>
  )
}
