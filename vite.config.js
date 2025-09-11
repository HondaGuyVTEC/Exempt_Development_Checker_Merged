import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '541ac8ebfb02.ngrok-free.app'  // 👈 add your ngrok domain here
    ],
    host: true, // 👈 allows external connections
    port: 5173 // or whatever port you're using
  }
});
