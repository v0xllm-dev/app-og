import { SiteConfig } from '@vx/config-generator'

/**
 * Basic site configuration example
 */
const basicConfig: SiteConfig = {
  site: {
    name: 'Basic App',
    shortName: 'BasicApp',
    title: 'Basic App - Simple and Clean',
    description: 'A simple and clean progressive web application',
    author: 'Your Company',
    keywords: ['app', 'basic', 'simple', 'pwa'],
    version: '1.0.0'
  },
  
  seo: {
    openGraph: {
      type: 'website',
      title: 'Basic App',
      description: 'A simple and clean progressive web application',
      image: '/og-image.png'
    },
    twitter: {
      card: 'summary',
      site: '@basicapp',
      creator: '@basicapp',
      title: 'Basic App',
      description: 'A simple and clean progressive web application',
      image: '/twitter-image.png'
    }
  },
  
  pwa: {
    themeColor: {
      light: '#ffffff',
      dark: '#1a1a1a'
    },
    backgroundColor: {
      light: '#ffffff',
      dark: '#1a1a1a'
    },
    display: 'standalone',
    orientation: 'any',
    startUrl: '/',
    scope: '.',
    categories: ['productivity']
  },
  
  icons: {
    favicon: {
      light: '/favicon-light.ico',
      dark: '/favicon-dark.ico'
    },
    appleTouchIcon: '/apple-touch-icon.png',
    maskIcon: {
      light: '/safari-pinned-tab.svg',
      dark: '/safari-pinned-tab.svg',
      color: {
        light: '#000000',
        dark: '#ffffff'
      }
    },
    manifest: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  
  browser: {
    msApplication: {
      name: 'Basic App',
      startUrl: '/',
      tileColor: '#ffffff'
    },
    apple: {
      mobileWebAppTitle: 'Basic App',
      mobileWebAppCapable: true,
      mobileWebAppStatusBarStyle: 'default'
    }
  },
  
  splashScreens: {
    light: [],
    dark: []
  },
  
  shortcuts: [
    {
      name: 'Home',
      shortName: 'Home',
      url: '/',
      icons: [
        {
          src: '/icons/shortcut-home.png',
          type: 'image/png',
          sizes: '192x192'
        }
      ]
    }
  ]
}

export default basicConfig