import { expect, test } from 'claude-code/testing'

const props = (bodyColumns: number) => ({
  hasSurvey: false,
  isWorking: false,
  maxRows: 20,
  bodyColumns,
  scroll: { offset: 0, bodyRows: 19 },
  view: {},
})

test('draws the painting on desktop and terminal', async $ => {
  const desktop = await $.ui.mount({ plugin: 'monet-banner', surface: 'desktop', component: 'AbovePrompt', props: props(100) })
  expect(await desktop.find({ type: 'Svg' })).toBeDefined()
  expect(await desktop.find({ text: /Woman with a Parasol/ })).toBeDefined()

  const terminal = await $.ui.mount({ plugin: 'monet-banner', surface: 'terminal', component: 'AbovePrompt', props: props(120) })
  expect(await terminal.find({ type: 'Image' })).toBeDefined()
})

test('/monet hides and shows the banner', async ($, on) => {
  on('ui.render', $ => ({ type: 'Box', props: {}, children: [] }) as never)
  await $.command.run({ name: 'monet' })
  const hidden = await $.ui.mount({ plugin: 'monet-banner', surface: 'desktop', component: 'AbovePrompt', props: props(100) })
  expect(await hidden.find({ type: 'Svg' })).toBeUndefined()

  await $.command.run({ name: 'monet' })
  const shown = await $.ui.mount({ plugin: 'monet-banner', surface: 'desktop', component: 'AbovePrompt', props: props(100) })
  expect(await shown.find({ type: 'Svg' })).toBeDefined()
})
