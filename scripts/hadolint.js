import { resolve } from 'path'
import { sh } from '../utils/sh.js'

class Hadolint {
  constructor (version) {
    this.version = version
  }

  setup () {
    sh(`docker pull hadolint/hadolint:${this.version}`)
  }

  lint ({ path }) {
    const config = `${resolve(path)}/hadolint.yaml:/root/.config/hadolint.yaml`

    sh(`docker run --rm -i -v ${config} hadolint/hadolint:${this.version} < ${path}/Dockerfile`)
  }
}

export {
  Hadolint
}
