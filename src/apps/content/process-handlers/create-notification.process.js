import { durations } from '@src/constants/web-elements.constants'
import { delay } from '@src/helpers/utils.helpers'
import { createNotification } from '@src/helpers/web-components.helpers'

export default async (resolve, _reject, data) => {
  const notification = {
    title: data.title,
    message: data.message
  }

  createNotification({ ...notification, theme: data.theme, duration: durations.EXTENDED })

  await delay(500)

  resolve(notification)
}
