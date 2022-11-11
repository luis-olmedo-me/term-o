import { useCallback, useState } from 'preact/hooks'
import { replaceByParams } from './useMessageLog.helpers'

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
