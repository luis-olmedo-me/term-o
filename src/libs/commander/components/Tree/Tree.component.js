import React from 'react'

const collapsedObjectLabel = '{ ... }'
const collapsedArrayLabel = '[ ... ]'

export const Tree = ({ content, title, hasComa }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  const isContentObject = typeof content === 'object'
  const isContentArray = Array.isArray(content)
  const isContentOnlyObject = isContentObject && !isContentArray

  if (isContentOnlyObject) {
    const collapsingLabel = isCollapsed ? collapsedObjectLabel : '{'
    const labelTitle = title ? `${title}: ${collapsingLabel}` : collapsingLabel

    return (
      <div>
        {labelTitle}

        <button
          style={{ marginLeft: 5 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '+' : '-'}
        </button>

        {isCollapsed
          ? null
          : Object.entries(content).map(([key, value]) => (
              <div style={{ marginLeft: 20 }}>
                <Tree content={value} title={key} />
              </div>
            ))}

        {!isCollapsed && '}'}
      </div>
    )
  } else if (isContentArray) {
    const collapsingLabel = isCollapsed ? collapsedArrayLabel : '['
    const labelTitle = title ? `${title}: ${collapsingLabel}` : collapsingLabel

    return (
      <div>
        {labelTitle}

        <button
          style={{ marginLeft: 5 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '+' : '-'}
        </button>

        {isCollapsed
          ? null
          : Object.entries(content).map(([key, value]) => (
              <div style={{ marginLeft: 20 }}>
                <Tree content={value} title={key} />
              </div>
            ))}

        {!isCollapsed && ']'}
      </div>
    )
  }

  const isContentString = typeof content === 'string'
  const quotedContent = isContentString ? `"${content}"` : content

  return <span>{title ? `${title}: ${quotedContent}` : quotedContent}</span>
}
