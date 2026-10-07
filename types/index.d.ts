export type BannerHidden = boolean

declare module 'claude-code' {
  interface PluginState {
    'monet-banner': { isHidden: BannerHidden }
  }
}
