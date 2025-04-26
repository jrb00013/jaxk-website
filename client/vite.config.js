import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    hmr: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
})




// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [
//     react({
//       jsxRuntime: 'classic', // Explicitly use classic JSX runtime
//       babel: {
//         plugins: [
//           ['@babel/plugin-transform-react-jsx', {
//             runtime: 'classic'
//           }]
//         ]
//       }
//     })
//   ],
//   server: {
//     port: 5173,
//     hmr: {
//       overlay: true // Disable HMR error overlay // was false before
//     }
//   },
//   build: {
//     outDir: 'dist',
//     emptyOutDir: true
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       loader: {
//         '.js': 'jsx' // Enable JSX parsing in .js files
//       }
//     }
//   }
// });
