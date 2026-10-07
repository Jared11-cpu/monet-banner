import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import { png, svg } from './art'

const isHidden = atom({ plugin: 'monet-banner', key: 'isHidden' } as const, false)

const CAPTION = 'Claude Monet · Woman with a Parasol, 1875'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'monet', description: '显示或隐藏莫奈画作横幅' })
    return next(e)
  })

  on('command.run', { name: 'monet' }, async $ => {
    const hidden = await read($, isHidden)
    await update($, isHidden, () => !hidden)
    return { text: hidden ? '已显示莫奈横幅' : '已隐藏莫奈横幅，输入 /monet 可再显示' }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey || (await read($, isHidden))) {
      return next(e)
    }

    if (e.surface === 'desktop') {
      const { Box, Svg, Text } = $.ui.resolve(e)
      return (
        <Box flexDirection="column">
          <Svg source={svg} alt={CAPTION} height={120} />
          <Text dimColor>{CAPTION}</Text>
        </Box>
      )
    }

    if (e.surface === 'terminal') {
      const { Box, Image, Text } = $.ui.resolve(e)
      const columns = Math.max(1, Math.min(e.props.bodyColumns, 255))
      const rows = Math.max(1, Math.min(Math.round(columns / 8), 6, e.props.maxRows - 1))
      return (
        <Box flexDirection="column">
          <Image source={{ png }} columns={columns} rows={rows} alt={CAPTION} />
          <Text dimColor>{CAPTION}</Text>
        </Box>
      )
    }

    return next(e)
  })
}
