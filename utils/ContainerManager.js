import { GenericContainer } from 'testcontainers'
import util from 'util'
import childProcess from 'child_process'

const exec = util.promisify(childProcess.exec)

class ContainerManager {
  constructor (path) {
    this.path = path
  }

  async build (buildArgs) {
    const dockerfile = GenericContainer.fromDockerfile(this.path)

    Object.entries(buildArgs).forEach(([key, val]) => {
      dockerfile.withBuildArg(key, val)
    })

    this.image = await dockerfile.build()
    this.id = `${this.image.image}:${this.image.tag}`
  }

  async run (cmd = 'sleep 1') {
    console.log('this.image', this.image)
    this.container = await this.image
      .withCmd(cmd.split(' '))
      .start()
  }

  /**
   * @param {string} cmd
   */
  async exec (cmd) {
    const { output, exitCode } = await this.container.exec(cmd.split(' '))

    return {
      output: output.replace(/(\r\n|\n|\r)/gm, ''),
      exitCode
    }
  }

  async stop () {
    this.container && await this.container.stop()
  }

  async rmImage () {
    this.id && await exec(`docker rmi ${this.id}`)
  }
}

export {
  ContainerManager
}
