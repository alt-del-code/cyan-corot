// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';


import icon from 'astro-icon';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
    // Storage for the site
  site : 'https://krrishco.in',
  
  integrations: [
    react(),
    tailwind(),
    mdx(),
    sitemap(),
    partytown(),
    markdoc(),
    icon(),
    keystatic(),
  ],

  
});