import fs from 'node:fs/promises'
import path from 'path'

import { cyan, green, reset } from '../constants/system.constants'

const dest = path.resolve(__dirname, '../../build')

export function buildSizeDisplay(watch) {
  const approvalLabel = watch ? `${cyan}` : `${green}✔ `

  return {
    name: 'build-size-display',
    async closeBundle() {
      const sizeInBytes = await getFolderSize(dest)
      const size = formatFolderSize(sizeInBytes)

      console.log(`${green}${approvalLabel}Total size: ${size}.${reset}`)
    }
  }
}

async function getFolderSize(dirPath) {
  let totalSize = 0

  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true })
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name)
      const isDirectory = file.isDirectory()
      const isFile = file.isFile()

      if (isDirectory) {
        totalSize += await getFolderSize(fullPath)
      } else if (isFile) {
        const stats = await fs.stat(fullPath)

        totalSize += stats.size
      }
    }
  } catch (error) {
    console.warn(`[vite-plugin-size] Can not be read: ${dirPath}`)
  }

  return totalSize
}

function formatFolderSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const index = Math.floor(Math.log(bytes) / Math.log(1024))
  const unitIndex = Math.min(index, units.length - 1)
  const formattedValue = (bytes / Math.pow(1024, unitIndex)).toFixed(2)

  if (unitIndex === 0) {
    return `${bytes} Bytes`
  }

  return `${formattedValue} ${units[unitIndex]} (${bytes.toLocaleString()} bytes)`
}
