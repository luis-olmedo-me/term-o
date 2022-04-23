import React, { useState, useCallback } from 'react'
import { OutputWrapper } from './Outputs.styles'

const replaceByParams = (message, params) => {
  return message.replace(/\{([^\}]+)?\}/g, (_, paramKey) => params[paramKey])
}

export const Outputs = ({ components, id, outsideProps }) => {
  const defaultData = components.map((Component, index) => ({
    Component,
    isVisible: index === 0
  }))

  const [data, setData] = useState(defaultData)
  const [params, setParams] = useState([])
  const [messageData, setMessageData] = useState({ message: '', type: '' })

  const showNextVisibleComponent = useCallback(() => {
    setData((oldData) => {
      const nextVisibleComponentIndex =
        oldData.findIndex((component) => component.isVisible) + 1

      if (nextVisibleComponentIndex < oldData.length) {
        const nextVisibleComponent = oldData[nextVisibleComponentIndex]
        const nextVisibleComponentData = [
          ...oldData.slice(0, nextVisibleComponentIndex),
          { ...nextVisibleComponent, isVisible: true },
          ...oldData.slice(nextVisibleComponentIndex + 1)
        ]

        return nextVisibleComponentData
      }

      return oldData
    })
  }, [])

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
      {componentsShown.map(({ Component }, indexId) => {
        const isLastComponent = indexId === componentsShown.length - 1

        const providerProps = {
          ...outsideProps,
          setMessageData: setMessageDataWithParams,
          messageData: isLastComponent ? messageData : {},
          setParams,
          finish: showNextVisibleComponent
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
