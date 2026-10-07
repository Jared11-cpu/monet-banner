import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

const isHidden = atom({ plugin: 'monet-banner', key: 'isHidden' } as const, false)

// Colors sampled from Monet's "Woman with a Parasol": canvas cream, sky blue, parasol green.
const CANVAS = '#F4ECD8'
const SKY = '#EAF2F8'
const SKY_EDGE = '#9DB8CC'
const PARASOL = '#5E8C6A'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'monet', description: '开启或关闭莫奈消息配色' })
    return next(e)
  })

  on('command.run', { name: 'monet' }, async $ => {
    const hidden = await read($, isHidden)
    await update($, isHidden, () => !hidden)
    return { text: hidden ? '已开启莫奈配色' : '已关闭莫奈配色，输入 /monet 可再开启' }
  })

  on('ui.render', { component: 'UserMessage' }, async ($, e, next) => {
    if (e.surface !== 'desktop' || (await read($, isHidden))) return next(e)
    const { Box } = $.ui.resolve(e)
    const row = await next(e)
    return (
      <Box backgroundColor={CANVAS} borderStyle="round" borderColor={SKY_EDGE} paddingX={1}>
        {row}
      </Box>
    )
  })

  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    if (e.surface !== 'desktop' || (await read($, isHidden))) return next(e)
    const { Box } = $.ui.resolve(e)
    const row = await next(e)
    return (
      <Box backgroundColor={SKY} borderStyle="single" borderColor={PARASOL} paddingX={1}>
        {row}
      </Box>
    )
  })
}
