import { storageNamespaces } from '@src/constants/storage.constants'

export default async (resolve, data) => {
  let { namespace, key, value } = data

  switch (namespace) {
    case storageNamespaces.LOCAL:
      window.localStorage.setItem(key, value)
      break
    case storageNamespaces.SESSION:
      window.sessionStorage.setItem(key, value)
      break
    case storageNamespaces.COOKIE:
      document.cookie = `${key}=${value}`
      break
  }

  resolve({ [key]: value })
}
