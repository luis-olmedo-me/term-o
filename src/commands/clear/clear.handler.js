import { storageKeys } from '@src/constants/storage.constants'
import storage from '@src/libs/storage'

export const clearHandler = async command => {
  storage.set(storageKeys.HISTORY, [])
  command.hide()
}
