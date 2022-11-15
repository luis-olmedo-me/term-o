import * as React from 'preact'

import { commander } from 'libs/commander/commander.service'
import { useCallback, useMemo, useState } from 'preact/hooks'

export const OutputSecuence = ({ id, sequences, outsideProps }) => {
  const defaultData = useMemo(
    () =>
      sequences.map((line, index) => ({
        Component: commander.getOutputs(`${id}-${index}`, line),
        isVisible: index === 0
      })),
    [id]
  )

  const [data, setData] = useState(defaultData)

  const showNextVisibleComponent = useCallback(() => {
    setData(oldData => {
      const nextInvisibleComponentIndex = oldData.findIndex(component => !component.isVisible)
      const hasNextComponent = nextInvisibleComponentIndex !== -1

      return hasNextComponent
        ? oldData.map((data, index) => ({
            ...data,
            isVisible: data.isVisible || index === nextInvisibleComponentIndex
          }))
        : oldData
    })
  }, [])

  const componentsShown = data.filter(item => item.isVisible)

  return (
    <>
      {componentsShown.map(({ Component }, indexId) => {
        return (
          <Component
            key={`${id}-${indexId}`}
            outsideProps={outsideProps}
            onFinishAll={showNextVisibleComponent}
          />
        )
      })}
    </>
  )
}
