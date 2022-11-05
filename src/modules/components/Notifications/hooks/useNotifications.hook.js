import { useCallback, useEffect, useState } from 'react'
import { generateUUID } from 'src/helpers/utils.helpers'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, image) => {
    const id = generateUUID()

    setNotifications((oldNotifications) => {
      return [...oldNotifications, { id, message, image, isDead: false }]
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

  const showWorkerRequestError = useCallback(() => {
    addNotification('Worker connection lost, please refresh the window')
  }, [addNotification])

  return {
    notifications: firstThreeNotifications,
    addNotification,
    showWorkerRequestError
  }
}
