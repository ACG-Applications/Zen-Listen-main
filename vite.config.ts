import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
      return {
      base: '/Zen-Listen-main/',
      server: {
        port: 3000,
        host: '0.0.0.0',
        watch: {
          usePolling: true,
          interval: 1000,
          ignored: ['**/node_modules/**', '**/.git/**']
        }
      },
      css: {
        postcss: path.resolve(__dirname, 'postcss.config.js'),
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.ico', 'Antonio.png', 'pwa-192x192.png', 'pwa-512x512.png'],
          manifest: {
            name: 'Zen Listen',
            short_name: 'Zen Listen',
            description: 'JLPT Listening and Typing Practice',
            theme_color: '#fdfdfd',
            background_color: '#fdfdfd',
            display: 'standalone',
            start_url: '/Zen-Listen-main/', 
            icons: [
              {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png'
              }
            ]
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
            navigateFallback: 'index.html'
          }
        })
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});