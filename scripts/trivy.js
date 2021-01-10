import { resolve } from 'path'
import { sh } from '../utils/sh.js'
import { binDir } from '../utils/bin.js'

class Trivy {
  constructor (version) {
    this.version = version
  }

  setup () {
    sh(`curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/${this.version}/contrib/install.sh | sh -s -- -b ${binDir()}`)
  }

  check ({ path, tag }) {
    const config = `${resolve(path)}/.trivyignore`

    sh(`./bin/trivy image --ignorefile ${config} --exit-code 1 --severity HIGH,CRITICAL ${path}:${tag}`)
  }
}

export {
  Trivy
}
