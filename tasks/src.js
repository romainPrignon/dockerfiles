import { help } from 'tasksfile'
import { sh } from '../utils/sh.js'

const src = [
  'tasksfile.js',
  'scripts/',
  'tasks/',
  'utils/'
]

help(lint, 'lint codebase', {
  examples: 'npx task src:lint'
})
/**
 * @param {{fix: boolean}} options
 */
function lint ({ fix }) {
  const _fix = fix ? '--fix' : ''

  sh(`eslint ${_fix} ${src.join(' ')} romainprignon/`)
}

help(tsc, 'typecheck codebase', {
  examples: 'npx task src:tsc'
})
function tsc () {
  sh('tsc')
}

export {
  lint,
  tsc
}
