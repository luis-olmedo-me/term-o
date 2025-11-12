import { getCookies, getLocal, getSession } from '@content/helpers/storage-management.helpers'

export default async (resolve, _reject, data) => {
  let storage = {}

  if (data.includeLocal) storage = getLocal()
  if (data.includeSession) storage = getSession()
  if (data.includeCookies) storage = getCookies()

  resolve(storage)
}
