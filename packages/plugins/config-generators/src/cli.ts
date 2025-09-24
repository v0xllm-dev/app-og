@@ .. @@
     // Load configuration
     console.log('📖 Loading configuration...')
     const config = await loadConfigFromFile(options.config)
+    
+    // Validate configuration
+    const validation = validateConfig(config)
+    if (!validation.valid) {
+      console.error('❌ Configuration validation failed:')
+      validation.errors.forEach(error => {
+        console.error(`  • ${error}`)
+      })
+      process.exit(1)
+    }
     
     if (options.
     }verbose) {