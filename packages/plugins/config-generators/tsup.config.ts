@@ .. @@
   sourcemap: true,
   minify: false,
   target: 'node16',
-  banner: {
-    js: '#!/usr/bin/env node'
-  },
-  esbuildOptions(options) {
-    // Make CLI executable
-    if (options.entryPoints && typeof options.entryPoints === 'object' && 'cli' in options.entryPoints) {
-      options.banner = {
-        js: '#!/usr/bin/env node'
-      }
+  esbuildOptions(options, context) {
+    // Add shebang to CLI files
+    if (context.format === 'cjs') {
+      options.banner = options.banner || {}
+      options.banner.js = '#!/usr/bin/env node'
     }
   }
 })