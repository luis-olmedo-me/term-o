import { silentQuotes } from '../processes.helpers'
import { getCookies } from './get-storage.helpers'

export const getStorage = (resolve, data) => {
  let storages = {}

  if (data.includeLocal) storages = { ...storages, local: silentQuotes(window.localStorage) }
  if (data.includeSession) storages = { ...storages, session: silentQuotes(window.sessionStorage) }
  if (data.includeCookies) storages = { ...storages, cookies: silentQuotes(getCookies()) }

  resolve(storages)
}
