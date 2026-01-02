import { storageNamespaces } from '@src/constants/storage.constants'

export const getStorageNamespace = (includeLocal, includeSession, includeCookies) => {
  if (includeLocal) return storageNamespaces.LOCAL
  else if (includeSession) return storageNamespaces.SESSION
  else if (includeCookies) return storageNamespaces.COOKIE
  return null
}
