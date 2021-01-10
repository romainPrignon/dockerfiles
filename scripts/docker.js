import { sh } from '../utils/sh.js'

class Docker {
  setup () {
    sh('curl -sSL https://get.docker.com | bash')
    sh('sudo usermod -aG docker $(whoami)')
  }

  build ({ image, context, buildArgs }) {
    const args = Object.keys(buildArgs).map(key => `--build-arg ${key}=${buildArgs[key]}`).join(' ')

    sh(`DOCKER_CONTENT_TRUST=1 docker build ${args} -t ${image} ${context}`)
  }

  push ({ image }) {
    sh(`docker push ${image}`)
  }
}

export {
  Docker
}
