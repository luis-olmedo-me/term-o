import { getCookies, getLocal, getSession } from './get-storage.helpers'

export const getStorage = (resolve, data) => {
  let storages = {}

  if (data.includeLocal) storages = { ...storages, local: getLocal() }
  if (data.includeSession) storages = { ...storages, session: getSession() }
  if (data.includeCookies) storages = { ...storages, cookies: getCookies() }

  resolve(storages)
}
