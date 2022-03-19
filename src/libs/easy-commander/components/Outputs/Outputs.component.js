import React, { useState } from 'react'
import { OutputWrapper } from './Outputs.styles'

export const Outputs = ({ components, id, outsideProps }) => {
  const defaultData = components.map((Component, index) => ({
    Component,
    parameters: {},
    isVisible: index === 0
  }))

  const [data, setData] = useState(defaultData)
  const [messageData, setMessageData] = useState({ message: '', type: '' })

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
          ...outsideProps,
          setMessageData,
          messageData: isLastComponent ? messageData : {},
          setParameters: (value) => setParametersWithId(nextId, value),
          parameters
        }

        return (
          <Component key={`${id}-${indexId}`} providerProps={providerProps} />
        )
      })}
    </OutputWrapper>
  )
}
