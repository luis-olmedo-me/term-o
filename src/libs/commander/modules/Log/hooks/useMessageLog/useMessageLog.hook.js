import { replaceByParams } from './useMessageLog.helpers'
import { useState, useCallback } from 'react'

export const useMessageLog = () => {
  const [log, setLog] = useState(null)

  const setMessageDataWithParams = useCallback((messageData, params = {}) => {
    const newMessageData = {
      ...messageData,
      message: replaceByParams(messageData.message, params)
    }

    setLog(newMessageData)
  }, [])

  return { log, setMessage: setMessageDataWithParams }
}
