import * as React from 'preact'

import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { debounce } from 'src/helpers/utils.helpers.js'
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

  const showNextVisibleComponent = useCallback(options => {
    const didBreak = Boolean(options?.break)
    const didIgnore = Boolean(options?.ignore)

    if (didIgnore) return
    if (!didBreak) setParams(options?.formatter || defaultFormatter)

    setData(oldData => {
      const oldDataCopy = [...oldData]
      const nextInvisibleComponentIndex = oldData.findIndex(component => !component.isVisible)

      const hasNextComponent = nextInvisibleComponentIndex !== -1

      if (hasNextComponent && !didBreak) {
        return oldDataCopy.map((data, index) => ({
          ...data,
          isVisible: data.isVisible || index === nextInvisibleComponentIndex
        }))
      }

      return didBreak ? [...oldData] : oldData
    })
  }, [])

  const scrollIntoLastComponent = useCallback(
    debounce(() => {
      const children = Array.from(wrapperRef.current?.children || [])
      const lastChild = children.at(-1)

      if (lastChild) lastChild.scrollIntoView({ behavior: 'smooth' })
    }, 450),
    []
  )
  const checkRoundedComponents = useCallback(
    debounce(() => {
      const logs = wrapperRef.current?.getElementsByClassName('log') || []

      const validatedLogs = Array.from(logs)
      const firstLog = validatedLogs.at(0)
      const lastLog = validatedLogs.at(-1)

      validatedLogs.forEach(log => {
        log.classList.remove('rounded-b')
        log.classList.remove('rounded-t')
      })

      if (firstLog) firstLog.classList.add('rounded-t')
      if (lastLog) lastLog.classList.add('rounded-b')
    }, 100),
    []
  )

  useEffect(() => {
    if (!data.length) return

    scrollIntoLastComponent()
    checkRoundedComponents()
  }, [data, scrollIntoLastComponent, checkRoundedComponents])

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
