import { cli } from 'tasksfile'
import * as src from './tasks/src.js'
import * as docker from './tasks/docker.js'

cli({
  src,
  docker
})
