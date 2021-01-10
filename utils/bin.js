import { resolve } from 'path'
import { currentDir } from './currentDir.js'

function binDir () {
  return resolve(currentDir(import.meta.url) + '/../bin')
}

export {
  binDir
}
