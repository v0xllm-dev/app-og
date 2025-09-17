/**
 * Configuration types for PWA and browser settings
 */

// Base configuration types
export interface SiteConfig {
  // Basic site information
  site: {
    name: string
    shortName: string
    title: string
    description: string
    author: string
    keywords: string[]
    url?: string
    version: string
  }
  
  // SEO and social media configuration
  seo: {
    openGraph: {
      type: string
      title: string
      description: string
      image: string
      url?: string
    }
    twitter: {
      card: string
      site: string
      creator: string
      title: string
      description: string
      image: string
    }
  }
  
  // PWA configuration
  pwa: {
    themeColor: {
      light: string
      dark: string
    }
    backgroundColor: {
      light: string
      dark: string
    }
    display: string
    orientation: string
    startUrl: string
    scope: string
    categories: string[]
  }
  
  // Icons configuration
  icons: {
    favicon: {
      light: string
      dark: string
    }
    appleTouchIcon: string
    maskIcon: {
      light: string
      dark: string
      color: {
        light: string
        dark: string
      }
    }
    manifest: Array<{
      src: string
      sizes: string
      type: string
      purpose?: string
    }>
  }
  
  // Browser configuration
  browser: {
    msApplication: {
      name: string
      startUrl: string
      tileColor: string
    }
    apple: {
      mobileWebAppTitle: string
      mobileWebAppCapable: boolean
      mobileWebAppStatusBarStyle: string
    }
  }
  
  // Splash screens and shortcuts
  splashScreens: {
    light: Array<{
      media: string
      href: string
    }>
    dark: Array<{
      media: string
      href: string
    }>
  }
  
  shortcuts: Array<{
    name: string
    shortName: string
    url: string
    icons: Array<{
      src: string
      type: string
      sizes: string
    }>
  }>
}

// Manifest types
export interface ManifestIcon {
  src: string
  sizes: string
  type: string
  purpose?: string
}

export interface ManifestShortcut {
  name: string
  short_name?: string
  url: string
  icons: ManifestIcon[]
}

export interface ManifestScreenshot {
  src: string
  type: string
  sizes: string
  form_factor?: 'narrow' | 'wide'
  label?: string
}

export interface PWAManifest {
  manifest_version: number
  version: string
  id: string
  name: string
  short_name: string
  description: string
  scope: string
  start_url: string
  display: string
  orientation: string
  theme_color: string
  background_color: string
  categories: string[]
  icons: ManifestIcon[]
  screenshots?: ManifestScreenshot[]
  shortcuts?: ManifestShortcut[]
}

// Generator options
export interface GeneratorOptions {
  outputDir?: string
  manifestFileName?: string
  browserConfigFileName?: string
  cdnBase?: string
  version?: string
}

// CLI options
export interface CLIOptions extends GeneratorOptions {
  config: string
  verbose?: boolean
  dryRun?: boolean
}