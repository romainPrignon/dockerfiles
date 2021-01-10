/* eslint-disable node/no-callback-literal */

import { describe, it } from '@jest/globals'
import { Builder } from './Builder'
import { Runner } from './Runner'

function describeImage (name, test) {
  const builder = new Builder(name)

  const _it = (desc, cb, timeout = 5000) => {
    it(desc, async () => {
      const img = await builder.image
      const runner = new Runner(img)

      await cb({ runner })

      await runner.stop()
    }, timeout)
  }

  return describe(name, () => {
    // TODO: put it in the global teardown
    afterAll(async () => {
      await builder.rm()
    })

    test({ it: _it, builder })
  })
}

export {
  describeImage
}
