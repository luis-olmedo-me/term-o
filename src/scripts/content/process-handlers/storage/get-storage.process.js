import { getCookies, getLocal, getSession } from './storage.helpers'

export const getStorage = async (resolve, data) => {
  let storage = {}

  if (data.includeLocal) storage = getLocal()
  if (data.includeSession) storage = getSession()
  if (data.includeCookies) storage = getCookies()

  resolve(storage)
}
