#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { join, resolve } from 'path'
import { CLIOptions } from './types'
import { writeConfigFiles, loadConfigFromFile, getFileStats } from './utils'

/**
 * CLI for generating configuration files
 */
async function main() {
  const argv = await yargs(hideBin(process.argv))
    .usage('Usage: $0 [options]')
    .option('config', {
      alias: 'c',
      type: 'string',
      description: 'Path to configuration file',
      demandOption: true
    })
    .option('output', {
      alias: 'o',
      type: 'string',
      description: 'Output directory',
      default: './public'
    })
    .option('manifest-name', {
      type: 'string',
      description: 'Manifest file name',
      default: 'manifest.json'
    })
    .option('browserconfig-name', {
      type: 'string',
      description: 'Browser config file name',
      default: 'browserconfig.xml'
    })
    .option('cdn-base', {
      type: 'string',
      description: 'CDN base URL for assets'
    })
    .option('version', {
      type: 'string',
      description: 'Version override'
    })
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Verbose output',
      default: false
    })
    .option('dry-run', {
      type: 'boolean',
      description: 'Show what would be generated without writing files',
      default: false
    })
    .help()
    .alias('help', 'h')
    .example('$0 -c ./src/config/site.ts', 'Generate config files from TypeScript config')
    .example('$0 -c ./config.json -o ./dist', 'Generate config files from JSON config to dist folder')
    .parseAsync()

  const options: CLIOptions = {
    config: resolve(argv.config),
    outputDir: resolve(argv.output),
    manifestFileName: argv['manifest-name'],
    browserConfigFileName: argv['browserconfig-name'],
    cdnBase: argv['cdn-base'],
    version: argv.version,
    verbose: argv.verbose,
    dryRun: argv['dry-run']
  }

  try {
    console.log('🚀 Starting configuration file generation...')
    
    if (options.verbose) {
      console.log(`📁 Config file: ${options.config}`)
      console.log(`📁 Output directory: ${options.outputDir}`)
      console.log(`📄 Manifest name: ${options.manifestFileName}`)
      console.log(`📄 Browser config name: ${options.browserConfigFileName}`)
      if (options.cdnBase) console.log(`🌐 CDN base: ${options.cdnBase}`)
      if (options.version) console.log(`🏷️  Version override: ${options.version}`)
      console.log('')
    }

    // Load configuration
    console.log('📖 Loading configuration...')
    const config = await loadConfigFromFile(options.config)
    
    if (options.verbose) {
      console.log(`✅ Loaded config for: ${config.site.name} v${config.site.version}`)
    }

    if (options.dryRun) {
      console.log('🔍 Dry run mode - no files will be written')
      console.log('')
      console.log('Would generate:')
      console.log(`  📄 ${join(options.outputDir || './public', options.manifestFileName || 'manifest.json')}`)
      console.log(`  📄 ${join(options.outputDir || './public', options.browserConfigFileName || 'browserconfig.xml')}`)
      return
    }

    // Generate files
    console.log('🔧 Generating configuration files...')
    const result = await writeConfigFiles(config, options)

    if (result.success) {
      console.log('✅ Configuration files generated successfully!')
      console.log('')
      console.log('Generated files:')
      
      result.files.forEach(file => {
        const stats = getFileStats(file)
        console.log(`  📄 ${file} (${stats.size})`)
      })
      
      if (options.verbose && result.files.length > 0) {
        console.log('')
        console.log('🎉 All files are ready for deployment!')
      }
    } else {
      console.error('❌ Failed to generate configuration files:')
      result.errors.forEach(error => {
        console.error(`  • ${error}`)
      })
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

// Run CLI if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  })
}

export { main as runCLI }