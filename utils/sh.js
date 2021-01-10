import { sh as tsh } from 'tasksfile'

function sh (cmd) {
  process.stdout.write('\n') // give me some space
  return tsh(cmd, {
    nopipe: true,
    async: false
  })
}

export {
  sh
}
