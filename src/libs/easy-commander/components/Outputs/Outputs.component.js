import React, { useState } from 'react'
import { OutputWrapper } from './Outputs.styles'

export const Outputs = ({ components, id }) => {
  const defaultData = components.map((Component, index) => ({
    Component,
    parameters: {},
    isVisible: index === 0
  }))

  const [data, setData] = useState(defaultData)
  const [errorMessage, setErrorMessage] = useState('')

  const setParametersWithId = (indexId, value) => {
    const newData = data.map((dataForComponent, index) => {
      return indexId === index
        ? { ...dataForComponent, parameters: value, isVisible: true }
        : dataForComponent
    })

    setData(newData)
  }

  const componentsShown = data.filter((item) => item.isVisible)

  return (
    <OutputWrapper>
      {componentsShown.map(({ Component, parameters }, indexId) => {
        const nextId = indexId + 1
        const isLastComponent = indexId === componentsShown.length - 1

        const providerProps = {
          parameters,
          setParameters: (value) => setParametersWithId(nextId, value),
          setErrorMessage
        }

        return isLastComponent && errorMessage ? (
          <span key={`${id}-error-message`}>{errorMessage}</span>
        ) : (
          <Component key={`${id}-${indexId}`} {...providerProps} />
        )
      })}
    </OutputWrapper>
  )
}
