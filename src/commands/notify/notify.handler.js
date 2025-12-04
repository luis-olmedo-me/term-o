import { createHelpView } from '@src/helpers/command.helpers'
import { formatNotification } from '@src/helpers/format.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export const notifyHandler = async command => {
  const P = name => command.props[name]

  if (P`create`) {
    const id = createUUIDv4()
    const title = P`title`
    const message = P`message`

    const notification = { id, title, message }
    const update = formatNotification(notification)

    command.throw(update)
  }

  if (P`help`) createHelpView(command)
}
