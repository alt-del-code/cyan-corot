// keystatic.config.ts
import { config } from '@keystatic/core';
import { 
  blogCollection, 
  portfolioCollection, 
  serviceCategoriesCollection, 
  servicesCollection, 
  siteSettings, 
  about,
  heroSlidesCollection
} from './src/cms';
import { tagCollection } from './src/cms/tags';
import { materialCategories, materials } from './src/cms/material';
import React from 'react';

export default config({
  ui: {
    brand: {
      name: 'krrishCo CMS',
      mark: () => React.createElement('span', null, '🎨'),
    },
  },
  storage: {
    kind: 'local',
  },
  collections: {
    blog: blogCollection,
    portfolio: portfolioCollection,
    serviceCategories: serviceCategoriesCollection,
    services: servicesCollection,
    tags: tagCollection,
    materialCategories: materialCategories,
    materials: materials,
    heroSlides: heroSlidesCollection,
  },
  singletons: {
    settings: siteSettings,
    about: about,
  },
});