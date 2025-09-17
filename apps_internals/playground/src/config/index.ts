/**
 * Configuration Index
 * 
 * Re-exports all configuration modules for easy importing
 */

export { default as siteConfig } from './site'
export type { SiteConfig } from './site'
export { generateManifest, generateBrowserConfig } from './site'