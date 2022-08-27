import { useCallback, useEffect, useState } from 'react'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  console.log({ notifications })

  const addNotification = useCallback((id, message) => {
    setNotifications((oldNotifications) => {
      return [...oldNotifications, { id, message }]
    })
  }, [])

  useEffect(() => {
    if (!notifications.length) return

    const clearLastNotificationTimeoutId = setTimeout(() => {
      setNotifications((oldNotifications) => {
        return oldNotifications.slice(1)
      })
    }, 3000)

    return () => clearTimeout(clearLastNotificationTimeoutId)
  }, [notifications])

  const firstThreeNotifications = oldNotifications.slice(0, 2)

  return { notifications: firstThreeNotifications, addNotification }
}
