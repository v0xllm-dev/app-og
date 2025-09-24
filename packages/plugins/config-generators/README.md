@@ .. @@
 #### `configGenerator(options: ViteConfigGeneratorOptions): Plugin`
 Creates a Vite plugin for automatic configuration file generation.
 
-**Options:**
-- `configPath: string` - Path to configuration file (required if config not provided)
-- `config?: SiteConfig` - Direct configuration object (alternative to configPath)
-- `outputDir?: string` - Output directory (default: './public')
-- `dev?: boolean` - Generate files in development mode (default: false)
-- `watch?: boolean` - Watch config file for changes (default: true)
-- `verbose?: boolean` - Enable verbose logging (default: true)
-- `cdnBase?: string` - CDN base URL for assets
-- `version?: string` - Version override
+**ViteConfigGeneratorOptions:**
+```typescript
+interface ViteConfigGeneratorOptions extends GeneratorOptions {
+  configPath: string          // Path to configuration file
+  config?: SiteConfig         // Direct configuration object (alternative to configPath)
+  outputDir?: string          // Output directory (default: './public')
+  dev?: boolean              // Generate files in development mode (default: false)
+  watch?: boolean            // Watch for config file changes and regenerate (default: true)
+  verbose?: boolean          // Whether to log generation process (default: true)
+  cdnBase?: string           // CDN base URL for assets
+  version?: string           // Version override
+}
+```