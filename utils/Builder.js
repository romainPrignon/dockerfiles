import { GenericContainer } from 'testcontainers'
import util from 'util'
import childProcess from 'child_process'

const exec = util.promisify(childProcess.exec)

class Builder {
  constructor (path) {
    this.path = path
  }

  async build (buildArgs) {
    const dockerfile = GenericContainer.fromDockerfile(this.path)

    Object.entries(buildArgs).forEach(([key, val]) => {
      dockerfile.withBuildArg(key, val)
    })

    this.image = dockerfile.build()
  }

  async rm () {
    const { image, tag } = await this.image
    await exec(`docker rmi ${image}:${tag}`)
  }
}

export {
  Builder
}
