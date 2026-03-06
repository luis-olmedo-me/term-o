import { delay } from '@src/helpers/utils.helpers'
import { createNotification } from '@src/helpers/web-components.helpers'

export default async (resolve, _reject, data) => {
  const notification = {
    title: data.title,
    message: data.message,
    color: data.color
  }

  createNotification({ ...notification, theme: data.theme })

  await delay(150)

  resolve(notification)
}
