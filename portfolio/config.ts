import { defineCollection, z } from 'astro:content';
import { materialCategories, materials } from '../cms/material';

// Shared schemas
const seoSchema = z.object({
  title: z.string().max(60).optional(),
  description: z.string().max(160).optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().default(false),
});

const imageSchema = z.string().url().refine((url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}, { message: 'Invalid URL format' });

// Blog collection
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(5).max(100),
    publishedDate: z.coerce.date(),
    isDraft: z.boolean().default(true),
    featured: z.boolean().default(false),
    excerpt: z.string().min(50).max(200),
    coverImage: imageSchema,
    categories: z.array(z.string()).min(1).default(['Uncategorized']),
    seo: seoSchema.optional(),
  }),
});

// Portfolio collection
const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(5).max(100),
    completionDate: z.coerce.date(),
    client: z.string().optional(),
    featured: z.boolean().default(false),
    shortDescription: z.string().max(150).optional(),
    thumbnail: imageSchema,
    projectImages: z.array(imageSchema).optional(),
    services: z.array(z.string()).min(1),
    materialsUsed: z.array(z.string()).optional(),
    fabricationProcess: z.string().optional(),
    projectScope: z.string().optional(),
    deliverables: z.array(z.string()).optional(),
    clientTestimonial: z.string().optional(),
    projectDuration: z.string().optional(),
    projectBudget: z.string().optional(),
    serviceCategory: z.string(),
    projectChallenges: z.string().optional(),
    projectSolutions: z.string().optional(),
    beforeAfterImages: z.array(z.object({
      before: imageSchema,
      after: imageSchema,
      description: z.string().optional()
    })).optional(),
    technologies: z.array(z.string()).optional(),
    projectUrl: z.string().url().optional(),
    seo: seoSchema.optional(),
  }),
});

// About collection
const about = defineCollection({
  type: 'content',
  schema: z.object({
    meta: seoSchema,
    title: z.string().min(5).max(100),
    subtitle: z.string().optional(),
    intro: z.string().optional(),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
      description: z.string().optional(),
    })).optional(),
    vision: z.string().optional(),
    mission: z.string().optional(),
    values: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    })).optional(),
    team: z.array(z.object({
      name: z.string(),
      position: z.string(),
      bio: z.string().optional(),
      image: imageSchema.optional(),
      socialLinks: z.array(z.object({
        platform: z.enum(['linkedin', 'twitter', 'github', 'instagram']),
        url: z.string().url(),
      })).optional(),
    })).optional(),
    milestones: z.array(z.object({
      year: z.string(),
      title: z.string(),
      description: z.string().optional(),
    })).optional(),
  }),
});

// Settings collection
const settings = defineCollection({
  type: 'data',
  schema: z.object({
    siteName: z.string(),
    siteDescription: z.string().max(200),
    logo: imageSchema.optional(),
    favicon: imageSchema.optional(),
    contactInfo: z.object({
      email: z.string().email(),
      phone: z.string().optional(),
      address: z.string().optional(),
      socialLinks: z.array(z.object({
        platform: z.enum(['linkedin', 'twitter', 'github', 'instagram', 'facebook']),
        url: z.string().url(),
      })).optional(),
    }),
    seo: seoSchema.optional(),
  }),
});

export const collections = {
  blog,
  portfolio,
  about,
  settings,
  materialCategories: materialCategories,
  materials: materials
};
