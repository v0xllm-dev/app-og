import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { SiteConfig, GeneratorOptions, CLIOptions } from './types'
import { generateManifest, generateBrowserConfig, validateConfig } from './generators'

/**
 * Write configuration files to disk
 */
export async function writeConfigFiles(
  config: SiteConfig,
  options: GeneratorOptions = {}
): Promise<{ success: boolean; files: string[]; errors: string[] }> {
  const {
    outputDir = './public',
    manifestFileName = 'manifest.json',
    browserConfigFileName = 'browserconfig.xml'
  } = options

  const files: string[] = []
  const errors: string[] = []

  try {
    // Validate configuration first
    const validation = validateConfig(config)
    if (!validation.valid) {
      return {
        success: false,
        files: [],
        errors: validation.errors
      }
    }

    // Ensure output directory exists
    ensureDir(outputDir)

    // Generate and write manifest.json
    try {
      const manifest = generateManifest(config, options)
      const manifestPath = join(outputDir, manifestFileName)
      writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
      files.push(manifestPath)
    } catch (error) {
      errors.push(`Failed to generate manifest: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Generate and write browserconfig.xml
    try {
      const browserConfig = generateBrowserConfig(config, options)
      const browserConfigPath = join(outputDir, browserConfigFileName)
      writeFileSync(browserConfigPath, browserConfig)
      files.push(browserConfigPath)
    } catch (error) {
      errors.push(`Failed to generate browserconfig: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    return {
      success: errors.length === 0,
      files,
      errors
    }
  } catch (error) {
    return {
      success: false,
      files,
      errors: [`Failed to write config files: ${error instanceof Error ? error.message : 'Unknown error'}`]
    }
  }
}

/**
 * Load configuration from file
 */
export async function loadConfigFromFile(configPath: string): Promise<SiteConfig> {
  if (!existsSync(configPath)) {
    throw new Error(`Configuration file not found: ${configPath}`)
  }

  const ext = configPath.split('.').pop()?.toLowerCase()

  try {
    if (ext === 'json') {
      const content = readFileSync(configPath, 'utf-8')
      return JSON.parse(content)
    } else if (ext === 'js' || ext === 'mjs' || ext === 'ts') {
      // Dynamic import for ES modules and TypeScript
      const module = await import(configPath)
      return module.default || module
    } else {
      throw new Error(`Unsupported configuration file format: ${ext}`)
    }
  } catch (error) {
    throw new Error(`Failed to load configuration: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Ensure directory exists
 */
export function ensureDir(dirPath: string): void {
  try {
    mkdirSync(dirPath, { recursive: true })
  } catch (error) {
    // Directory might already exist, ignore error
    if (error instanceof Error && !error.message.includes('EEXIST')) {
      throw error
    }
  }
}

/**
 * Format file size for logging
 */
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Get file stats for logging
 */
export function getFileStats(filePath: string): { size: string; exists: boolean } {
  try {
    if (existsSync(filePath)) {
      const stats = require('fs').statSync(filePath)
      return {
        size: formatFileSize(stats.size),
        exists: true
      }
    }
    return { size: '0 Bytes', exists: false }
  } catch {
    return { size: '0 Bytes', exists: false }
  }
}