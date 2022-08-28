import React from 'react'

export const ElementLabel = ({ element }) => {
  const { id, classList, href, type, fill } = element

  const tagName = element.tagName.toLowerCase()
  const classes = [...classList].join(' ')

  const viewBox = element.getAttribute('viewBox')
  const width = element.getAttribute('width')
  const height = element.getAttribute('height')

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

      {type && (
        <>
          <span style={{ color: '#F8C572' }}>{` type`}</span>
          <span style={{ color: '#F6AD37' }}>{`=`}</span>
          <span style={{ color: '#F5A524' }}>{`"${type}"`}</span>
        </>
      )}

      {fill && (
        <>
          <span style={{ color: '#F8C572' }}>{` fill`}</span>
          <span style={{ color: '#F6AD37' }}>{`=`}</span>
          <span style={{ color: '#F5A524' }}>{`"${fill}"`}</span>
        </>
      )}

      {width && (
        <>
          <span style={{ color: '#F8C572' }}>{` width`}</span>
          <span style={{ color: '#F6AD37' }}>{`=`}</span>
          <span style={{ color: '#F5A524' }}>{`"${width}"`}</span>
        </>
      )}
      {height && (
        <>
          <span style={{ color: '#F8C572' }}>{` height`}</span>
          <span style={{ color: '#F6AD37' }}>{`=`}</span>
          <span style={{ color: '#F5A524' }}>{`"${height}"`}</span>
        </>
      )}

      {viewBox && (
        <>
          <span style={{ color: '#F8C572' }}>{` viewBox`}</span>
          <span style={{ color: '#F6AD37' }}>{`=`}</span>
          <span style={{ color: '#F5A524' }}>{`"${viewBox}"`}</span>
        </>
      )}

      <span style={{ color: '#9BA1A6' }}>{' />'}</span>
    </span>
  )
}
