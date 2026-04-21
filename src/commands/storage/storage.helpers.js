import { storageNamespaces } from '@src/constants/storage.constants'

export const getStorageNamespace = (includeLocal, includeSession, includeCookies) => {
  if (includeLocal) return storageNamespaces.LOCAL
  else if (includeSession) return storageNamespaces.SESSION
  else if (includeCookies) return storageNamespaces.COOKIE
  return null
}

export const isStorageMatch = (filters, [key, value]) => {
  const hasFilters = filters.length > 0

  return (
    !hasFilters ||
    filters.some(([filterKey, filterValue]) => {
      return filterValue
        ? key.includes(filterKey) && value.includes(filterValue)
        : key.includes(filterKey)
    })
  )
}
