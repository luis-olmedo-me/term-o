import * as React from 'preact'
import { useCallback, useRef, useState } from 'preact/hooks'
import { OutputWrapper } from './Outputs.styles'

const defaultFormatter = oldParam => {
  return [...oldParam, {}]
}

const OutputsNonMemoized = ({ components, id, outsideProps }) => {
  const defaultData = components.map((Component, index) => ({
    Component,
    isVisible: index === 0
  }))

  const [data, setData] = useState(defaultData)
  const [params, setParams] = useState([])

  const wrapperRef = useRef(null)

  const showNextVisibleComponent = useCallback(paramFormatter => {
    setParams(paramFormatter || defaultFormatter)
    setData(oldData => {
      const nextInvisibleComponentIndex = oldData.findIndex(component => !component.isVisible)

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

    setTimeout(() => lastChild.scrollIntoView({ block: 'end' }))
  }, [])

  const componentsShown = data.filter(item => item.isVisible)

  const providerProps = {
    ...outsideProps,
    finish: showNextVisibleComponent
  }

  return (
    <OutputWrapper ref={wrapperRef}>
      {componentsShown.map(({ Component }, indexId) => {
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
// FIXME: USE MEMO HERE
export const Outputs = OutputsNonMemoized
