import React, { useState } from 'react'
import { OutputWrapper } from './Outputs.styles'

export const Outputs = ({ components, id }) => {
  const [carriedValues, setCarriedValues] = useState([{}])
  const [componentsShownCount, setComponentsShownCount] = useState(1)

  const setCarriedValueWithId = (value) => {
    const newCount = componentsShownCount + 1

    setComponentsShownCount(newCount)
    setCarriedValues([...carriedValues, value])
  }

  const componentsShown = components.slice(0, componentsShownCount)

  return (
    <OutputWrapper>
      {componentsShown.map((Component, indexId) => {
        const carriedValue = indexId ? carriedValues[indexId] : null

        const providerProps = {
          carriedValue: carriedValue || null,
          setCarriedValue: setCarriedValueWithId
        }

        return <Component key={`${id}-${indexId}`} {...providerProps} />
      })}
    </OutputWrapper>
  )
}
