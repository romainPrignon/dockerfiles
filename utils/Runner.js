class Runner {
  constructor (image) {
    this.image = image
  }

  async run (cmd = 'sleep 1') {
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
    if (!this.isStopped) {
      await this.container.stop()
      this.isStopped = true
    }
  }
}

export {
  Runner
}
