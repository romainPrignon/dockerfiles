import { sh } from '../utils/sh.js'

class Dive {
  constructor (version) {
    this.version = version
  }

  setup () {
    sh(`docker pull wagoodman/dive:${this.version}`)
  }

  debug ({ image }) {
    const sock = '/var/run/docker.sock:/var/run/docker.sock'

    sh(`docker run --rm -it -v ${sock} \
      wagoodman/dive:${this.version} ${image}`
    )
  }
}

export {
  Dive
}
