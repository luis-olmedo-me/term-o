import { useCallback, useEffect, useState } from 'react'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((id, message) => {
    setNotifications((oldNotifications) => {
      return [...oldNotifications, { id, message, isDead: false }]
    })
  }, [])

  useEffect(() => {
    if (!notifications.length) return

    const clearLastNotificationTimeoutId = setTimeout(() => {
      setNotifications((oldNotifications) => {
        const oldNotificationsAlive = oldNotifications.filter(
          ({ isDead }) => !isDead
        )

        return oldNotificationsAlive.map((notification, index) => {
          const isFirstNotification = index === 0

          return isFirstNotification
            ? { ...notification, isDead: true }
            : notification
        })
      })
    }, 3000)

    return () => clearTimeout(clearLastNotificationTimeoutId)
  }, [notifications])

  const firstThreeNotifications = notifications.reduce(
    (filteredNotifications, notification) => {
      const expectedNotifications = filteredNotifications.reduce(
        (count, filteredNotification) => {
          const isDead = filteredNotification.isDead

          return isDead ? count : count + 1
        },
        0
      )

      const hasEnoughNotifications = expectedNotifications > 2

      return !hasEnoughNotifications
        ? [...filteredNotifications, notification]
        : filteredNotifications
    },
    []
  )

  return { notifications: firstThreeNotifications, addNotification }
}
