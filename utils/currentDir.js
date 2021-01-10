import { dirname } from 'path'
import { fileURLToPath } from 'url'

function currentDir (filePath) {
  return dirname(fileURLToPath(filePath))
}

export {
  currentDir
}
