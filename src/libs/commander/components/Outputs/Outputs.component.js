import React, { useState, useCallback } from 'react'
import { OutputWrapper } from './Outputs.styles'

const replaceByParams = (message, params) => {
  return message.replace(/\{([^\}]+)?\}/g, (_, paramKey) => params[paramKey])
}

export const Outputs = ({ components, id, outsideProps }) => {
  const defaultData = components.map((Component, index) => ({
    Component,
    parameters: {},
    isVisible: index === 0
  }))

  const [data, setData] = useState(defaultData)
  const [params, setParams] = useState([])
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

  const setMessageDataWithParams = useCallback((messageData, params = {}) => {
    const newMessageData = {
      ...messageData,
      message: replaceByParams(messageData.message, params)
    }

    setMessageData(newMessageData)
  }, [])

  return (
    <OutputWrapper>
      {componentsShown.map(({ Component, parameters }, indexId) => {
        const nextId = indexId + 1
        const isLastComponent = indexId === componentsShown.length - 1

        const providerProps = {
          ...outsideProps,
          setMessageData: setMessageDataWithParams,
          messageData: isLastComponent ? messageData : {},
          setParameters: (value) => setParametersWithId(nextId, value),
          parameters,
          setParams
        }

        return (
          <Component
            key={`${id}-${indexId}`}
            providerProps={providerProps}
            possibleParams={params}
          />
        )
      })}
    </OutputWrapper>
  )
}
