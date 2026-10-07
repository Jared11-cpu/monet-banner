import { expect, test } from 'claude-code/testing'

const user = { text: '你好', origin: { kind: 'composer' }, isExpanded: true } as never
const reply = { text: '你好！', isFirstOfReply: true }

test('paints messages in Monet colors on desktop only', async ($, on) => {
  on('ui.render', $ => ({ type: 'Text', props: {}, children: ['row'] }) as never)

  const mine = await $.ui.mount({ plugin: 'monet-banner', surface: 'desktop', component: 'UserMessage', props: user })
  expect(await mine.find({ type: 'Box', props: { backgroundColor: '#F4ECD8' } })).toBeDefined()

  const claude = await $.ui.mount({ plugin: 'monet-banner', surface: 'desktop', component: 'AssistantMessage', props: reply })
  expect(await claude.find({ type: 'Box', props: { backgroundColor: '#EAF2F8' } })).toBeDefined()

  const terminal = await $.ui.mount({ plugin: 'monet-banner', surface: 'terminal', component: 'AssistantMessage', props: reply })
  expect(await terminal.find({ type: 'Box', props: { backgroundColor: '#EAF2F8' } })).toBeUndefined()
})

test('draws no banner above the prompt', async ($, on) => {
  on('ui.render', $ => ({ type: 'Box', props: {}, children: [] }) as never)
  const band = await $.ui.mount({
    plugin: 'monet-banner',
    surface: 'desktop',
    component: 'AbovePrompt',
    props: { hasSurvey: false, isWorking: false, maxRows: 20, bodyColumns: 100, scroll: { offset: 0, bodyRows: 19 }, view: {} },
  })
  expect(await band.find({ type: 'Svg' })).toBeUndefined()
})

test('/monet turns the colors off and on', async ($, on) => {
  on('ui.render', $ => ({ type: 'Text', props: {}, children: ['row'] }) as never)
  const painted = { type: 'Box', props: { backgroundColor: '#EAF2F8' } } as const

  await $.command.run({ name: 'monet' })
  const off = await $.ui.mount({ plugin: 'monet-banner', surface: 'desktop', component: 'AssistantMessage', props: reply })
  expect(await off.find(painted)).toBeUndefined()

  await $.command.run({ name: 'monet' })
  const on2 = await $.ui.mount({ plugin: 'monet-banner', surface: 'desktop', component: 'AssistantMessage', props: reply })
  expect(await on2.find(painted)).toBeDefined()
})
