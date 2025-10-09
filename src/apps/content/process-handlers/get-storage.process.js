import { getCookies, getLocal, getSession } from '@content/helpers/storage-management.helpers'

export const getStorage = async (resolve, data) => {
  let storage = {}

  if (data.includeLocal) storage = getLocal()
  if (data.includeSession) storage = getSession()
  if (data.includeCookies) storage = getCookies()

  resolve(storage)
}
