# @vx/config-generator

A reusable TypeScript package for generating PWA manifests, browser configurations, and meta tags from centralized site configurations.

## Features

- 🚀 **PWA Manifest Generation** - Generate complete `manifest.json` files
- 🌐 **Browser Config Generation** - Create `browserconfig.xml` for Windows tiles
- 🏷️ **Meta Tags Generation** - Generate HTML meta tags for SEO and PWA
- 📱 **TypeScript Support** - Full type safety with comprehensive interfaces
- 🛠️ **CLI Tool** - Command-line interface for build automation
- ✅ **Validation** - Built-in configuration validation
- 📦 **Multiple Formats** - Supports both CommonJS and ES modules

## Installation

```bash
# Using npm
npm install @vx/config-generator

# Using pnpm
pnpm add @vx/config-generator

# Using yarn
yarn add @vx/config-generator
```

## Quick Start

### 1. Create a Configuration File

Create a `site.config.ts` file:

```typescript
import { SiteConfig } from '@vx/config-generator'

const siteConfig: SiteConfig = {
  site: {
    name: 'My App',
    shortName: 'MyApp',
    title: 'My Awesome App',
    description: 'An awesome progressive web application',
    author: 'Your Name',
    keywords: ['pwa', 'app', 'awesome'],
    version: '1.0.0'
  },
  seo: {
    openGraph: {
      type: 'website',
      title: 'My Awesome App',
      description: 'An awesome progressive web application',
      image: 'https://example.com/og-image.png'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@myapp',
      creator: '@myapp',
      title: 'My Awesome App',
      description: 'An awesome progressive web application',
      image: 'https://example.com/twitter-image.png'
    }
  },
  pwa: {
    themeColor: {
      light: '#ffffff',
      dark: '#000000'
    },
    backgroundColor: {
      light: '#ffffff',
      dark: '#000000'
    },
    display: 'standalone',
    orientation: 'any',
    startUrl: '/',
    scope: '.',
    categories: ['productivity', 'utilities']
  },
  icons: {
    favicon: {
      light: '/favicon-light.png',
      dark: '/favicon-dark.png'
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
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  browser: {
    msApplication: {
      name: 'My App',
      startUrl: '/',
      tileColor: '#ffffff'
    },
    apple: {
      mobileWebAppTitle: 'My App',
      mobileWebAppCapable: true,
      mobileWebAppStatusBarStyle: 'default'
    }
  },
  splashScreens: {
    light: [],
    dark: []
  },
  shortcuts: []
}

export default siteConfig
```

### 2. Generate Configuration Files

#### Using the CLI

```bash
# Generate files using CLI
npx generate-config -c ./site.config.ts -o ./public

# With verbose output
npx generate-config -c ./site.config.ts -o ./public --verbose

# Dry run to see what would be generated
npx generate-config -c ./site.config.ts --dry-run
```

#### Using the Programmatic API

```typescript
import { writeConfigFiles, loadConfigFromFile } from '@vx/config-generator'

async function generateConfigs() {
  // Load configuration
  const config = await loadConfigFromFile('./site.config.ts')
  
  // Generate files
  const result = await writeConfigFiles(config, {
    outputDir: './public',
    cdnBase: 'https://cdn.example.com',
    version: '1.0.0'
  })
  
  if (result.success) {
    console.log('Generated files:', result.files)
  } else {
    console.error('Errors:', result.errors)
  }
}

generateConfigs()
```

#### Using Individual Generators

```typescript
import { generateManifest, generateBrowserConfig, generateMetaTags } from '@vx/config-generator'
import siteConfig from './site.config'

// Generate manifest object
const manifest = generateManifest(siteConfig, {
  cdnBase: 'https://cdn.example.com'
})

// Generate browserconfig XML string
const browserConfig = generateBrowserConfig(siteConfig, {
  cdnBase: 'https://cdn.example.com'
})

// Generate HTML meta tags string
const metaTags = generateMetaTags(siteConfig, {
  cdnBase: 'https://cdn.example.com'
})
```

## API Reference

### Types

#### `SiteConfig`
Main configuration interface containing all site settings.

#### `GeneratorOptions`
Options for customizing the generation process:
- `outputDir?: string` - Output directory (default: './public')
- `manifestFileName?: string` - Manifest filename (default: 'manifest.json')
- `browserConfigFileName?: string` - Browser config filename (default: 'browserconfig.xml')
- `cdnBase?: string` - CDN base URL for assets
- `version?: string` - Version override

### Functions

#### `generateManifest(config: SiteConfig, options?: GeneratorOptions): PWAManifest`
Generates a PWA manifest object from site configuration.

#### `generateBrowserConfig(config: SiteConfig, options?: GeneratorOptions): string`
Generates browserconfig.xml content as a string.

#### `generateMetaTags(config: SiteConfig, options?: GeneratorOptions): string`
Generates HTML meta tags as a string.

#### `writeConfigFiles(config: SiteConfig, options?: GeneratorOptions): Promise<Result>`
Writes both manifest.json and browserconfig.xml files to disk.

#### `loadConfigFromFile(configPath: string): Promise<SiteConfig>`
Loads configuration from a TypeScript, JavaScript, or JSON file.

#### `validateConfig(config: SiteConfig): ValidationResult`
Validates a site configuration and returns validation results.

## CLI Options

```bash
generate-config [options]

Options:
  -c, --config <path>              Path to configuration file (required)
  -o, --output <dir>               Output directory (default: ./public)
  --manifest-name <name>           Manifest file name (default: manifest.json)
  --browserconfig-name <name>      Browser config file name (default: browserconfig.xml)
  --cdn-base <url>                 CDN base URL for assets
  --version <version>              Version override
  -v, --verbose                    Verbose output
  --dry-run                        Show what would be generated without writing files
  -h, --help                       Show help
```

## Integration Examples

### With Build Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "generate:config": "generate-config -c ./src/config/site.ts -o ./public",
    "build": "npm run generate:config && your-build-command"
  }
}
```

### With Nx Workspace

Add to your `project.json`:

```json
{
  "targets": {
    "generate-config": {
      "executor": "nx:run-commands",
      "options": {
        "command": "generate-config -c ./src/config/site.ts -o ./dist"
      }
    },
    "build": {
      "dependsOn": ["generate-config"]
    }
  }
}
```

### With Vite

Create a Vite plugin:

```typescript
import { Plugin } from 'vite'
import { writeConfigFiles, loadConfigFromFile } from '@vx/config-generator'

export function configGeneratorPlugin(configPath: string): Plugin {
  return {
    name: 'config-generator',
    buildStart: async () => {
      const config = await loadConfigFromFile(configPath)
      await writeConfigFiles(config, { outputDir: './public' })
    }
  }
}
```

## Migration Guide

### From Existing Implementation

If you're migrating from an existing implementation:

1. **Install the package**: `npm install @vx/config-generator`
2. **Update imports**: Replace local imports with package imports
3. **Update configuration**: Ensure your config matches the `SiteConfig` interface
4. **Update build scripts**: Use the CLI or programmatic API

### Breaking Changes

- Configuration structure may need updates to match `SiteConfig` interface
- Function signatures have changed to accept options parameter
- CLI arguments have been standardized

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.