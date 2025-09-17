import { SiteConfig, PWAManifest, GeneratorOptions } from './types'

/**
 * Generate PWA manifest.json from site configuration
 */
export function generateManifest(config: SiteConfig, options: GeneratorOptions = {}): PWAManifest {
  const manifest: PWAManifest = {
    manifest_version: 1,
    version: config.site.version,
    id: config.site.name.toLowerCase().replace(/\s+/g, '-'),
    name: config.site.name,
    short_name: config.site.shortName,
    description: config.site.description,
    scope: config.pwa.scope,
    start_url: config.pwa.startUrl,
    display: config.pwa.display,
    orientation: config.pwa.orientation,
    theme_color: '#000000', // Default fallback
    background_color: '#ffffff', // Default fallback
    categories: config.pwa.categories,
    icons: config.icons.manifest
  }

  // Add screenshots if available
  if (config.site.version) {
    manifest.screenshots = [
      {
        src: `${options.cdnBase || ''}/screenshots/home-512x512.png?vx=${config.site.version}`,
        type: 'image/png',
        sizes: '512x512'
      }
    ]
  }

  // Add shortcuts if available
  if (config.shortcuts && config.shortcuts.length > 0) {
    manifest.shortcuts = config.shortcuts
  }

  return manifest
}

/**
 * Generate browserconfig.xml from site configuration
 */
export function generateBrowserConfig(config: SiteConfig, options: GeneratorOptions = {}): string {
  const cdnBase = options.cdnBase || ''
  const version = config.site.version
  const versionQuery = version ? `?vx=${version}` : ''

  return `<?xml version="1.0" encoding="utf-8" ?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo
        src="${cdnBase}/icons/icon-square-70x70.png${versionQuery}" />
      <square150x150logo
        src="${cdnBase}/icons/icon-square-150x150.png${versionQuery}" />
      <wide310x150logo
        src="${cdnBase}/icons/icon-square-310x150.png${versionQuery}" />
      <square310x310logo
        src="${cdnBase}/icons/icon-square-310x310.png${versionQuery}" />
      <tilecolor>${config.browser.msApplication.tileColor}</tilecolor>
    </tile>
  </msapplication>
</browserconfig>`
}

/**
 * Generate HTML meta tags from site configuration
 */
export function generateMetaTags(config: SiteConfig, options: GeneratorOptions = {}): string {
  const cdnBase = options.cdnBase || ''
  const version = config.site.version
  const versionQuery = version ? `?vx=${version}` : ''

  const metaTags = [
    // Basic meta tags
    `<title>${config.site.title}</title>`,
    `<meta name="description" content="${config.site.description}" />`,
    `<meta name="keywords" content="${config.site.keywords.join(', ')}" />`,
    `<meta name="author" content="${config.site.author}" />`,
    
    // PWA theme colors
    `<meta name="theme-color" media="(prefers-color-scheme: light)" content="${config.pwa.themeColor.light}" />`,
    `<meta name="theme-color" media="(prefers-color-scheme: dark)" content="${config.pwa.themeColor.dark}" />`,
    
    // Favicon configuration
    `<link rel="icon" type="image/x-icon" media="(prefers-color-scheme: light)" href="${config.icons.favicon.light}" />`,
    `<link rel="icon" type="image/x-icon" media="(prefers-color-scheme: dark)" href="${config.icons.favicon.dark}" />`,
    
    // Apple touch icon
    `<link rel="apple-touch-icon" href="${config.icons.appleTouchIcon}" />`,
    
    // Apple mobile web app
    `<meta name="apple-mobile-web-app-title" content="${config.browser.apple.mobileWebAppTitle}" />`,
    `<meta name="apple-mobile-web-app-capable" content="${config.browser.apple.mobileWebAppCapable ? 'yes' : 'no'}" />`,
    `<meta name="apple-mobile-web-app-status-bar-style" content="${config.browser.apple.mobileWebAppStatusBarStyle}" />`,
    
    // Microsoft configuration
    `<meta name="application-name" content="${config.browser.msApplication.name}" />`,
    `<meta name="msapplication-starturl" content="${config.browser.msApplication.startUrl}" />`,
    
    // Open Graph
    `<meta property="og:type" content="${config.seo.openGraph.type}" />`,
    `<meta property="og:title" content="${config.seo.openGraph.title}" />`,
    `<meta property="og:description" content="${config.seo.openGraph.description}" />`,
    `<meta property="og:image" content="${config.seo.openGraph.image}" />`,
    
    // Twitter Card
    `<meta property="twitter:card" content="${config.seo.twitter.card}" />`,
    `<meta property="twitter:site" content="${config.seo.twitter.site}" />`,
    `<meta property="twitter:creator" content="${config.seo.twitter.creator}" />`,
    `<meta property="twitter:title" content="${config.seo.twitter.title}" />`,
    `<meta property="twitter:description" content="${config.seo.twitter.description}" />`,
    `<meta property="twitter:image" content="${config.seo.twitter.image}" />`
  ]

  // Add splash screens
  config.splashScreens.light.forEach(splash => {
    metaTags.push(`<link rel="apple-touch-startup-image" media="${splash.media}" href="${splash.href}" />`)
  })

  config.splashScreens.dark.forEach(splash => {
    metaTags.push(`<link rel="apple-touch-startup-image" media="${splash.media}" href="${splash.href}" />`)
  })

  return metaTags.join('\n    ')
}

/**
 * Validate site configuration
 */
export function validateConfig(config: SiteConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Required fields validation
  if (!config.site?.name) errors.push('site.name is required')
  if (!config.site?.description) errors.push('site.description is required')
  if (!config.site?.version) errors.push('site.version is required')
  if (!config.pwa?.startUrl) errors.push('pwa.startUrl is required')
  if (!config.icons?.manifest?.length) errors.push('icons.manifest array is required')

  // URL validation
  const urlFields = [
    config.icons?.favicon?.light,
    config.icons?.favicon?.dark,
    config.icons?.appleTouchIcon,
    config.seo?.openGraph?.image,
    config.seo?.twitter?.image
  ]

  urlFields.forEach((url, index) => {
    if (url && !isValidUrl(url)) {
      errors.push(`Invalid URL format in configuration field ${index}`)
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Simple URL validation helper
 */
function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (_) {
    // Check if it's a relative path
    return string.startsWith('/') || string.startsWith('./') || string.startsWith('../')
  }
}