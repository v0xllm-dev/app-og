/**
 * @vx/config-generator
 * 
 * Reusable configuration generator for PWA manifests and browser configs
 */

// Export all types
export * from './types'

// Export generator functions
export {
  generateManifest,
  generateBrowserConfig,
  generateMetaTags,
  validateConfig
} from './generators'

// Export utilities
export { writeConfigFiles, loadConfigFromFile } from './utils'

// Default export for convenience
export { generateManifest as default } from './generators'