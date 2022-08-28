import React from 'react'

export const ElementLabel = ({ element }) => {
  const tagName = element.tagName.toLowerCase()

  return (
    <span>
      <span style={{ color: '#9BA1A6' }}>{'<'}</span>
      <span style={{ color: '#0070f3' }}>{tagName}</span>
      <span style={{ color: '#9BA1A6' }}>{' />'}</span>
    </span>
  )
}
