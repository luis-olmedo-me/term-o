import * as React from 'preact'

export const Logger = ({ logs }) => {
  return (
    <>
      {logs.map(log => (
        <div>{log}</div>
      ))}
    </>
  )
}
