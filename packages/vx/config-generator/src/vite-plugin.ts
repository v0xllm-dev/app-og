import { Plugin } from 'vite'
import { resolve } from 'path'
import { writeConfigFiles, loadConfigFromFile } from './utils'
import { SiteConfig, GeneratorOptions } from './types'

export interface ViteConfigGeneratorOptions extends GeneratorOptions {
  /**
   * Path to the configuration file
   */
  configPath: string
  
  /**
   * Whether to generate files in development mode
   * @default false
   */
  dev?: boolean
  
  /**
   * Whether to watch for config file changes and regenerate
   * @default true
   */
  watch?: boolean
  
  /**
   * Custom configuration object (alternative to configPath)
   */
  config?: SiteConfig
  
  /**
   * Whether to log generation process
   * @default true
   */
  verbose?: boolean
}

/**
 * Vite plugin for generating PWA manifest and browser configuration files
 * 
 * @example
 * ```typescript
 * import { defineConfig } from 'vite'
 * import { configGenerator } from '@vx/config-generator/vite'
 * 
 * export default defineConfig({
 *   plugins: [
 *     configGenerator({
 *       configPath: './src/config/site.ts',
 *       outputDir: './public',
 *       cdnBase: 'https://cdn.example.com'
 *     })
 *   ]
 * })
 * ```
 */
export function configGenerator(options: ViteConfigGeneratorOptions): Plugin {
  const {
    configPath,
    config: providedConfig,
    dev = false,
    watch = true,
    verbose = true,
    ...generatorOptions
  } = options

  let resolvedConfigPath: string
  let viteConfig: any

  const generateFiles = async () => {
    try {
      if (verbose) {
        console.log('🔧 [config-generator] Generating configuration files...')
      }

      let siteConfig: SiteConfig

      if (providedConfig) {
        siteConfig = providedConfig
      } else if (configPath) {
        siteConfig = await loadConfigFromFile(resolvedConfigPath)
      } else {
        throw new Error('Either configPath or config must be provided')
      }

      const result = await writeConfigFiles(siteConfig, {
        outputDir: generatorOptions.outputDir || './public',
        ...generatorOptions
      })

      if (result.success) {
        if (verbose) {
          console.log('✅ [config-generator] Configuration files generated successfully!')
          result.files.forEach(file => {
            console.log(`   📄 ${file}`)
          })
        }
      } else {
        console.error('❌ [config-generator] Failed to generate configuration files:')
        result.errors.forEach(error => {
          console.error(`   • ${error}`)
        })
      }
    } catch (error) {
      console.error('❌ [config-generator] Error:', error instanceof Error ? error.message : 'Unknown error')
    }
  }

  return {
    name: 'config-generator',
    
    configResolved(config) {
      viteConfig = config
      if (configPath) {
        resolvedConfigPath = resolve(config.root, configPath)
      }
    },

    async buildStart() {
      // Generate files at the start of build
      await generateFiles()
      
      // Add config file to watch list if in development and watch is enabled
      if (viteConfig.command === 'serve' && watch && configPath) {
        this.addWatchFile(resolvedConfigPath)
      }
    },

    async handleHotUpdate({ file, server }) {
      // Regenerate files when config file changes in development
      if (watch && file === resolvedConfigPath) {
        if (verbose) {
          console.log('🔄 [config-generator] Config file changed, regenerating...')
        }
        await generateFiles()
        
        // Trigger a full page reload to pick up new manifest/browserconfig
        server.ws.send({
          type: 'full-reload'
        })
        
        return []
      }
    },

    // Generate files in development mode if dev option is true
    configureServer(server) {
      if (dev) {
        server.middlewares.use('/__generate-config', async (req, res) => {
          await generateFiles()
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ success: true, message: 'Configuration files generated' }))
        })
      }
    }
  }
}

// Default export for convenience
export default configGenerator