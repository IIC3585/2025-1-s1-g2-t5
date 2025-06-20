// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react(), svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});