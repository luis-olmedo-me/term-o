import * as React from 'react'
import { useState, useCallback, useRef, useEffect } from 'react'
import { OutputWrapper } from './Outputs.styles'

const replaceByParams = (message, params) => {
  return message.replace(/\{([^\}]+)?\}/g, (_, paramKey) => params[paramKey])
}

const OutputsNonMemoized = ({ components, id, outsideProps }) => {
  const defaultData = components.map((Component, index) => ({
    Component,
    isVisible: index === 0
  }))

  const [data, setData] = useState(defaultData)
  const [params, setParams] = useState([])
  const [messageData, setMessageData] = useState({ message: '', type: '' })

  const fakeDelayTimeoutId = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(fakeDelayTimeoutId.current)
  }, [])

  const showNextVisibleComponent = useCallback(() => {
    const showNext = () => {
      setData((oldData) => {
        const nextInvisibleComponentIndex = oldData.findIndex(
          (component) => !component.isVisible
        )

        if (nextInvisibleComponentIndex !== -1) {
          const oldDataCopy = [...oldData]
          const newData = oldDataCopy.map((data, index) => ({
            ...data,
            isVisible: data.isVisible || index === nextInvisibleComponentIndex
          }))

          return newData
        }

        return oldData
      })

      const children = [...wrapperRef.current.children]
      const lastChild = children.at(-1)

      lastChild.scrollIntoView()
    }

    fakeDelayTimeoutId.current = setTimeout(showNext, 500)
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
    <OutputWrapper ref={wrapperRef}>
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
            id={indexId}
          />
        )
      })}
    </OutputWrapper>
  )
}

export const Outputs = React.memo(OutputsNonMemoized)
