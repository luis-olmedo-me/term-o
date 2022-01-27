import React, { useEffect, useState } from 'react'

export const Dom = ({ id, get = [], values, command }) => {
  const [elements, setElements] = useState([])

  useEffect(
    function searchElements() {
      const newElements = get.reduce((allElements, pattern) => {
        const foundElements = pattern
          ? window.document.querySelectorAll(pattern)
          : []

        return [...allElements, ...foundElements]
      }, [])

      setElements(newElements)
    },
    [get]
  )

  return (
    <div>
      <p>{command}</p>
      <p>
        {elements.map((element) => {
          return `${element.tagName} `
        })}
      </p>
    </div>
  )
}
