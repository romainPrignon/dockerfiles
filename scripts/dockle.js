import { resolve } from 'path'
import { sh } from '../utils/sh.js'

class Dockle {
  constructor (version) {
    this.version = version
  }

  setup () {
    sh(`sudo docker pull goodwithtech/dockle:${this.version}`)
  }

  check ({ path, tag }) {
    const sock = '/var/run/docker.sock:/var/run/docker.sock'
    const config = `${resolve(path)}/.dockleignore:/.dockleignore`

    sh(`docker run --rm -v ${sock} -v ${config} \
      goodwithtech/dockle:${this.version} --exit-code 1 --exit-level fatal ${path}:${tag}`
    )
  }
}

export {
  Dockle
}
