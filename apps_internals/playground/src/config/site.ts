/**
 * Centralized Site Configuration
 * 
 * This file contains all site metadata, SEO configuration, PWA settings,
 * and browser configuration for the playground application.
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

// CDN base URL for static assets
const CDN_BASE = 'https://static.cdn.vezham.com/apps_internals/playground'
const VERSION = '1.0.5'

// Main site configuration
const siteConfig: SiteConfig = {
  // Basic site information
  site: {
    name: 'Vezham Playground',
    shortName: 'Vezham Playground',
    title: 'Home | Vezham Playground',
    description: 'single app to manage your Vezham Playground',
    author: 'Vezham Technologies Private Limited',
    keywords: ['Vezham Playground', 'playground', 'development', 'tools'],
    version: VERSION
  },
  
  // SEO and social media configuration
  seo: {
    openGraph: {
      type: 'website',
      title: 'Vezham Playground',
      description: 'single app to manage your Vezham Playground',
      image: `${CDN_BASE}/icons/icon-512x512.png?vx=${VERSION}`
    },
    twitter: {
      card: 'summary_large_image',
      site: '@vezham',
      creator: '@vezham',
      title: 'Vezham Playground',
      description: 'single app to manage your Vezham Playground',
      image: `${CDN_BASE}/icons/icon-512x512.png?vx=${VERSION}`
    }
  },
  
  // PWA configuration
  pwa: {
    themeColor: {
      light: 'white',
      dark: 'black'
    },
    backgroundColor: {
      light: 'white',
      dark: 'black'
    },
    display: 'standalone',
    orientation: 'any',
    startUrl: '/?utm_source=homescreen&utm_medium=shortcut&pwa=true',
    scope: '.',
    categories: ['productivity', 'personalization', 'utilities']
  },
  
  // Icons configuration
  icons: {
    favicon: {
      light: `${CDN_BASE}/favicon-light.png?vx=${VERSION}`,
      dark: `${CDN_BASE}/favicon-dark.png?vx=${VERSION}`
    },
    appleTouchIcon: `${CDN_BASE}/icons/icon-512x512.png?vx=${VERSION}`,
    maskIcon: {
      light: `${CDN_BASE}/safari-pinned-tab.svg?vx=${VERSION}`,
      dark: `${CDN_BASE}/safari-pinned-tab.svg?vx=${VERSION}`,
      color: {
        light: 'black',
        dark: 'white'
      }
    },
    manifest: [
      {
        src: `${CDN_BASE}/icons/icon-48x48.png?vx=${VERSION}`,
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-72x72.png?vx=${VERSION}`,
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-96x96.png?vx=${VERSION}`,
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-128x128.png?vx=${VERSION}`,
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-192x192.png?vx=${VERSION}`,
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-384x384.png?vx=${VERSION}`,
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-512x512.png?vx=${VERSION}`,
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-1024x1024.png?vx=${VERSION}`,
        sizes: '1024x1024',
        type: 'image/png'
      }
    ]
  },
  
  // Browser configuration
  browser: {
    msApplication: {
      name: 'Vezham Playground',
      startUrl: '/',
      tileColor: 'transparent'
    },
    apple: {
      mobileWebAppTitle: 'Vezham Playground',
      mobileWebAppCapable: true,
      mobileWebAppStatusBarStyle: 'default'
    }
  },
  
  // Splash screens configuration
  splashScreens: {
    light: [
      {
        media: '(prefers-color-scheme: light) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/light/splash-iphone5.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/light/splash-iphone6.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
        href: `${CDN_BASE}/splashscreens/light/splash-iphonex.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/light/splash-iphonexr.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
        href: `${CDN_BASE}/splashscreens/light/splash-iphonexsmax.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
        href: `${CDN_BASE}/splashscreens/light/splash-iphoneplus.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/light/splash-ipad.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/light/splash-ipadpro1.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/light/splash-ipadpro3.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/light/splash-ipadpro2.png?vx=${VERSION}`
      }
    ],
    dark: [
      {
        media: '(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/dark/splash-iphone5.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/dark/splash-iphone6.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
        href: `${CDN_BASE}/splashscreens/dark/splash-iphonex.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/dark/splash-iphonexr.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
        href: `${CDN_BASE}/splashscreens/dark/splash-iphonexsmax.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
        href: `${CDN_BASE}/splashscreens/dark/splash-iphoneplus.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/dark/splash-ipad.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/dark/splash-ipadpro1.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/dark/splash-ipadpro3.png?vx=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splashscreens/dark/splash-ipadpro2.png?vx=${VERSION}`
      }
    ]
  },
  
  // App shortcuts
  shortcuts: [
    {
      name: 'Home',
      shortName: 'Home',
      url: '/?utm_source=jumplist&utm_medium=shortcut&pwa=true',
      icons: [
        {
          src: `${CDN_BASE}/shortcuts/icon-home-192x192.png?vx=${VERSION}`,
          type: 'image/png',
          sizes: '192x192'
        }
      ]
    }
  ]
}

// Helper functions for generating configuration files
export const generateManifest = (config: SiteConfig) => ({
  manifest_version: 1,
  version: config.site.version,
  id: 'vezham-playground',
  name: config.site.name,
  short_name: config.site.shortName,
  description: config.site.description,
  scope: config.pwa.scope,
  start_url: config.pwa.startUrl,
  display: config.pwa.display,
  orientation: config.pwa.orientation,
  theme_color: '#000000',
  background_color: '#ffffff',
  categories: config.pwa.categories,
  icons: config.icons.manifest,
  screenshots: [
    {
      src: `${CDN_BASE}/screenshots/home-512x512.png?vx=${config.site.version}`,
      type: 'image/png',
      sizes: '512x512'
    }
  ],
  shortcuts: config.shortcuts
})

export const generateBrowserConfig = (config: SiteConfig) => `<?xml version="1.0" encoding="utf-8" ?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo
        src="${CDN_BASE}/icons/icon-square-70x70.png?vx=${config.site.version}" />
      <square150x150logo
        src="${CDN_BASE}/icons/icon-square-150x150.png?vx=${config.site.version}" />
      <wide310x150logo
        src="${CDN_BASE}/icons/icon-square-310x150.png?vx=${config.site.version}" />
      <square310x310logo
        src="${CDN_BASE}/icons/icon-square-310x310.png?vx=${config.site.version}" />
      <tilecolor>${config.browser.msApplication.tileColor}</tilecolor>
    </tile>
  </msapplication>
</browserconfig>`

// Export default configuration
export default siteConfig