import { useCallback, useState } from 'react'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((id, message) => {
    setNotifications((oldNotifications) => {
      return [...oldNotifications, { id, message }]
    })
  }, [])

  return { notifications, addNotification }
}
