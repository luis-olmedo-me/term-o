import React from 'react'

export const ElementLabel = ({ element }) => {
  const { id, classList, href } = element

  const tagName = element.tagName.toLowerCase()
  const classes = [...classList].join(' ')

  return (
    <span>
      <span style={{ color: '#9BA1A6' }}>{'<'}</span>

      <span style={{ color: '#0070f3' }}>{tagName}</span>

      {id && (
        <>
          <span style={{ color: '#F8C572' }}>{` id`}</span>
          <span style={{ color: '#F6AD37' }}>{`=`}</span>
          <span style={{ color: '#F5A524' }}>{`"${id}"`}</span>
        </>
      )}

      {classes && (
        <>
          <span style={{ color: '#F8C572' }}>{` class`}</span>
          <span style={{ color: '#F6AD37' }}>{`=`}</span>
          <span style={{ color: '#F5A524' }}>{`"${classes}"`}</span>
        </>
      )}

      {href && (
        <>
          <span style={{ color: '#F8C572' }}>{` href`}</span>
          <span style={{ color: '#F6AD37' }}>{`=`}</span>
          <span style={{ color: '#F5A524' }}>{`"${href}"`}</span>
        </>
      )}

      <span style={{ color: '#9BA1A6' }}>{' />'}</span>
    </span>
  )
}
