import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Imagemin from 'vite-plugin-imagemin';



export default defineConfig({
  plugins: [
    vue(),
    Imagemin({
      gifsicle: {
        optimizationLevel: 3,
      },
      optipng: {
        optimizationLevel: 5,
      },
      mozjpeg: {
        quality: 75,
      },
      webp: {
        quality: 75,
      },
      avif: {
        quality: 50,
      },
    }),
  ],
  base: '/test_assignment/',

  server: {
    host: 'localhost', // Change to localhost or your desired host
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  }
})
