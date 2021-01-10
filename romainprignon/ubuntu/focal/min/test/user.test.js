import { describeImage } from '../../../../../utils/test.js'

describeImage('romainprignon/ubuntu/focal/min', ({ it, builder }) => {
  const user = 'foo'
  const password = 'bar'
  builder.build({ user, password })

  it('should use user specified at build time', async ({ runner }) => {
    await runner.run()

    const { output } = await runner.exec('whoami')
    expect(output).toEqual(user)

    await runner.stop()
  }, 40000)
})
