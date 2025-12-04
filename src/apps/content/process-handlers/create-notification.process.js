import { createNotification } from '@content/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const notification = createNotification({ message: data.message, theme: data.theme })
  const handleClick = async () => {
    await notification.remove()

    console.log('notification created')
    resolve(null)
  }

  notification.addEventListener('click', handleClick)
  notification.addEventListener('error', event => reject(event.detail))
}
