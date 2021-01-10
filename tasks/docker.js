import { help } from 'tasksfile'
import { Curl } from '../scripts/curl.js'
import { Docker } from '../scripts/docker.js'
import { Hadolint } from '../scripts/hadolint.js'
import { Dockle } from '../scripts/dockle.js'
import { Trivy } from '../scripts/trivy.js'
import { Dive } from '../scripts/dive.js'
import { sh } from '../utils/sh.js'

const defaultTag = 'latest'

const curl = new Curl()
const docker = new Docker()
const hadolint = new Hadolint('v1.19.0')
const dockle = new Dockle('v0.3.1')
const trivy = new Trivy('v0.15.0')
const dive = new Dive('v0.9.2')

help(setup, 'install required tools')
function setup () {
  curl.setup()
  docker.setup()
  hadolint.setup()
  dockle.setup()
  trivy.setup()
  dive.setup()
}

help(build, 'build docker image', {
  examples: 'npx task docker:build --user=foo --password=bar romainprignon/ubuntu/focal/min [latest]'
})
function build (options, path, tag = defaultTag) {
  docker.build({ image: `${path}:${tag}`, context: path, buildArgs: options })
}

help(lint, 'lint docker image', {
  examples: 'npx task docker:lint romainprignon/ubuntu/focal/min [latest]'
})
function lint (options, path, tag = defaultTag) {
  hadolint.lint({ path })
  dockle.lint({ path, tag })
  trivy.lint({ path, tag })
}

help(test, 'test docker image', {
  examples: 'npx task docker:test romainprignon/ubuntu/focal/min'
})
function test (options, path) {
  sh(`node --experimental-vm-modules node_modules/.bin/jest --detectOpenHandles ${path}/test/*.test.js`)
}

help(debug, 'debug docker image', {
  examples: 'npx task docker:debug romainprignon/ubuntu/focal/min [latest]'
})
function debug (options, path, tag = defaultTag) {
  dive.debug({ image: `${path}:${tag}` })
}

help(push, 'push docker image', {
  examples: 'npx task docker:push romainprignon/ubuntu/focal/min [latest]'
})
function push (options, path, tag = defaultTag) {
  docker.push({ image: `${path}:${tag}` })
}

export {
  setup,
  build,
  lint,
  test,
  debug,
  push
}
