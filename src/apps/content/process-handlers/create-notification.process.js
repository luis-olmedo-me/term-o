import { createBubble } from '@content/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const bubble = createBubble({ message: data.message, theme: data.theme })
  const handleClick = async () => {
    await bubble.remove()

    console.log('notification created')
    resolve(null)
  }

  bubble.addEventListener('click', handleClick)
  bubble.addEventListener('error', event => reject(event.detail))
}
