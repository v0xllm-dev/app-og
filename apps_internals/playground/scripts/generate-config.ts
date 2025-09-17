#!/usr/bin/env node

/**
 * Configuration File Generator
 * 
 * This script generates manifest.json and browserconfig.xml files
 * from the centralized site configuration.
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Import the configuration and helper functions
import siteConfig, { generateManifest, generateBrowserConfig } from '../src/config/site.js'

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')
const publicDir = join(projectRoot, 'public')

/**
 * Ensure directory exists
 */
function ensureDir(dirPath: string) {
  try {
    mkdirSync(dirPath, { recursive: true })
  } catch (error) {
    // Directory already exists
  }
}

/**
 * Generate and write manifest.json
 */
function generateManifestFile() {
  console.log('🔧 Generating manifest.json...')
  
  const manifest = generateManifest(siteConfig)
  const manifestPath = join(publicDir, 'manifest.json')
  
  ensureDir(publicDir)
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  
  console.log('✅ Generated manifest.json')
}

/**
 * Generate and write browserconfig.xml
 */
function generateBrowserConfigFile() {
  console.log('🔧 Generating browserconfig.xml...')
  
  const browserConfig = generateBrowserConfig(siteConfig)
  const browserConfigPath = join(publicDir, 'browserconfig.xml')
  
  ensureDir(publicDir)
  writeFileSync(browserConfigPath, browserConfig)
  
  console.log('✅ Generated browserconfig.xml')
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting configuration file generation...')
  console.log(`📁 Project root: ${projectRoot}`)
  console.log(`📁 Public directory: ${publicDir}`)
  console.log('')
  
  try {
    generateManifestFile()
    generateBrowserConfigFile()
    
    console.log('')
    console.log('🎉 All configuration files generated successfully!')
    console.log('')
    console.log('Generated files:')
    console.log('  📄 public/manifest.json')
    console.log('  📄 public/browserconfig.xml')
    
  } catch (error) {
    console.error('❌ Error generating configuration files:', error)
    process.exit(1)
  }
}

// Run the script
main()