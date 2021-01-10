import { describeImage } from '../../../../../utils/test.js'

describeImage('romainprignon/ubuntu/focal/min', ({ it, builder }) => {
  const user = 'foo'
  const password = 'bar'
  builder.build({ user, password })

  it('should be in sudo group', async ({ runner }) => {
    await runner.run()

    const { output } = await runner.exec('groups')
    const [outputUser, outputGroup] = output.split(' ')
    expect(outputUser).toEqual(user)
    expect(outputGroup).toEqual('sudo')

    await runner.stop()
  }, 40000)
})
