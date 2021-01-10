import { sh } from '../utils/sh.js'

class Curl {
  setup () {
    sh('sudo apt install -y curl')
  }
}

export {
  Curl
}
