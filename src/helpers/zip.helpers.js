import { decompressFromUTF16 } from 'lz-string'

export const safeDecompress = value => {
  try {
    return decompressFromUTF16(value)
  } catch {
    return null
  }
}
