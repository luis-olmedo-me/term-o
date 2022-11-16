import * as React from 'preact'

import { commander } from 'libs/commander/commander.service'
import { useMemo } from 'preact/hooks'

export const OutputsAsyncSecuence = ({ id, asyncSequences, outsideProps }) => {
  const data = useMemo(
    () => asyncSequences.map((line, index) => commander.getOutputsSecuence(`${id}-${index}`, line)),
    [id]
  )

  return (
    <>
      {data.map((Sequence, index) => {
        return <Sequence key={`${id}-${index}`} outsideProps={outsideProps} />
      })}
    </>
  )
}
