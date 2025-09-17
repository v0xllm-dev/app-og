import { SiteConfig } from '@vx/config-generator'

/**
 * Advanced site configuration example with CDN assets
 */
const CDN_BASE = 'https://cdn.example.com/myapp'
const VERSION = '2.1.0'

const advancedConfig: SiteConfig = {
  site: {
    name: 'Advanced PWA',
    shortName: 'AdvancedPWA',
    title: 'Advanced PWA - Feature Rich Application',
    description: 'A feature-rich progressive web application with advanced capabilities',
    author: 'Advanced Tech Corp',
    keywords: ['pwa', 'advanced', 'feature-rich', 'modern', 'web-app'],
    url: 'https://advanced-pwa.example.com',
    version: VERSION
  },
  
  seo: {
    openGraph: {
      type: 'website',
      title: 'Advanced PWA - Feature Rich Application',
      description: 'A feature-rich progressive web application with advanced capabilities',
      image: `${CDN_BASE}/social/og-image.png?v=${VERSION}`,
      url: 'https://advanced-pwa.example.com'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@advancedpwa',
      creator: '@advancedtech',
      title: 'Advanced PWA - Feature Rich Application',
      description: 'A feature-rich progressive web application with advanced capabilities',
      image: `${CDN_BASE}/social/twitter-image.png?v=${VERSION}`
    }
  },
  
  pwa: {
    themeColor: {
      light: '#6366f1',
      dark: '#4f46e5'
    },
    backgroundColor: {
      light: '#ffffff',
      dark: '#0f172a'
    },
    display: 'standalone',
    orientation: 'portrait-primary',
    startUrl: '/?utm_source=pwa&utm_medium=homescreen',
    scope: '/',
    categories: ['productivity', 'business', 'utilities']
  },
  
  icons: {
    favicon: {
      light: `${CDN_BASE}/favicons/favicon-light.png?v=${VERSION}`,
      dark: `${CDN_BASE}/favicons/favicon-dark.png?v=${VERSION}`
    },
    appleTouchIcon: `${CDN_BASE}/icons/apple-touch-icon.png?v=${VERSION}`,
    maskIcon: {
      light: `${CDN_BASE}/icons/safari-pinned-tab-light.svg?v=${VERSION}`,
      dark: `${CDN_BASE}/icons/safari-pinned-tab-dark.svg?v=${VERSION}`,
      color: {
        light: '#6366f1',
        dark: '#4f46e5'
      }
    },
    manifest: [
      {
        src: `${CDN_BASE}/icons/icon-48x48.png?v=${VERSION}`,
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-72x72.png?v=${VERSION}`,
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-96x96.png?v=${VERSION}`,
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-128x128.png?v=${VERSION}`,
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-192x192.png?v=${VERSION}`,
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-384x384.png?v=${VERSION}`,
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-512x512.png?v=${VERSION}`,
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: `${CDN_BASE}/icons/icon-1024x1024.png?v=${VERSION}`,
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  },
  
  browser: {
    msApplication: {
      name: 'Advanced PWA',
      startUrl: '/',
      tileColor: '#6366f1'
    },
    apple: {
      mobileWebAppTitle: 'Advanced PWA',
      mobileWebAppCapable: true,
      mobileWebAppStatusBarStyle: 'black-translucent'
    }
  },
  
  splashScreens: {
    light: [
      {
        media: '(prefers-color-scheme: light) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splash/light/iphone5.png?v=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splash/light/iphone6.png?v=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: light) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
        href: `${CDN_BASE}/splash/light/iphonex.png?v=${VERSION}`
      }
    ],
    dark: [
      {
        media: '(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splash/dark/iphone5.png?v=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
        href: `${CDN_BASE}/splash/dark/iphone6.png?v=${VERSION}`
      },
      {
        media: '(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
        href: `${CDN_BASE}/splash/dark/iphonex.png?v=${VERSION}`
      }
    ]
  },
  
  shortcuts: [
    {
      name: 'Dashboard',
      shortName: 'Dashboard',
      url: '/dashboard?utm_source=pwa&utm_medium=shortcut',
      icons: [
        {
          src: `${CDN_BASE}/shortcuts/dashboard-192x192.png?v=${VERSION}`,
          type: 'image/png',
          sizes: '192x192'
        }
      ]
    },
    {
      name: 'Analytics',
      shortName: 'Analytics',
      url: '/analytics?utm_source=pwa&utm_medium=shortcut',
      icons: [
        {
          src: `${CDN_BASE}/shortcuts/analytics-192x192.png?v=${VERSION}`,
          type: 'image/png',
          sizes: '192x192'
        }
      ]
    },
    {
      name: 'Settings',
      shortName: 'Settings',
      url: '/settings?utm_source=pwa&utm_medium=shortcut',
      icons: [
        {
          src: `${CDN_BASE}/shortcuts/settings-192x192.png?v=${VERSION}`,
          type: 'image/png',
          sizes: '192x192'
        }
      ]
    }
  ]
}

export default advancedConfig