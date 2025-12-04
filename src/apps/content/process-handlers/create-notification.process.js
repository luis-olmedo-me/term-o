import { createNotification } from '@content/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const notification = createNotification({
    id: data.id,
    title: data.title,
    message: data.message,
    theme: data.theme
  })
  const handleAppear = async () => {
    resolve(null)
  }

  notification.addEventListener('appear', handleAppear)
  notification.addEventListener('error', event => reject(event.detail))
}
