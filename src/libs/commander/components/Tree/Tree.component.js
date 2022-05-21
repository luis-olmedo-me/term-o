import React from 'react'

export const Tree = ({ content, title, hasComa }) => {
  const isContentObject = typeof content === 'object'
  const isContentArray = Array.isArray(content)
  const isContentOnlyObject = isContentObject && !isContentArray

  const contentParsed = isContentObject
    ? Object.entries(content).map(([key, value], index) => {
        const isLastIndex = index === Object.keys(content).length - 1

        return (
          <Tree
            key={key}
            content={value}
            title={isContentOnlyObject ? key : ''}
            hasComa={!isLastIndex}
          />
        )
      })
    : [content]

  const coma = hasComa ? ',' : ''

  console.log('title', title)
  console.log('content', content)
  console.log('hasComa', hasComa)

  return (
    <>
      {isContentOnlyObject && <span>{`{`}</span>}
      {isContentArray && <span>{`[`}</span>}

      <div style={{ marginLeft: 20 }}>
        {title && <span>{title}: </span>}
        {contentParsed}
        {!isContentObject && coma}
      </div>

      {isContentOnlyObject && <p style={{ margin: 0 }}>{`}${coma}`}</p>}
      {isContentArray && <p style={{ margin: 0 }}>{`]${coma}`}</p>}
    </>
  )
}
