import { defineCollection, z } from 'astro:content';
import { fields } from '@keystatic/core';

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

const contactSchema = z.object({
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    full: z.string().optional(),
    maps: z.string().url().optional(),
  }),
  phone: z.object({
    primary: z.string().optional(),
    secondary: z.string().optional(),
  }),
  email: z.object({
    primary: z.string().optional(),
    support: z.string().optional(),
  }),
});

// Tags collection
const tags = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['project-type', 'style', 'location', 'material-type', 'service-type']),
    color: z.string().optional(),
    description: z.string().optional(),
  }),
});

// Service Categories collection
const serviceCategories = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

// Services collection
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string(),
    serviceImage: imageSchema.optional(),
  }),
});

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
    client: z.string(),
    featured: z.boolean().default(false),
    shortDescription: z.string().max(150).optional(),
    thumbnail: imageSchema,
    projectImages: z.array(imageSchema).optional(),
    services: z.array(z.string()),
    materialsUsed: z.array(z.string()).optional(),
    materialSupply: z.array(z.string()).optional(),
    fabricationProcess: z.string().optional(),
    projectScope: z.string().optional(),
    deliverables: z.array(z.string()).optional(),
    clientTestimonial: z.string().optional(),
    projectDuration: z.string().optional(),
    projectBudget: z.string().optional(),
    serviceCategory: z.string(),
    tags: z.array(z.string()).optional(),
    projectChallenges: z.string().optional(),
    projectSolutions: z.string().optional(),
    beforeAfterImages: z.array(imageSchema).optional(),
    technologies: z.array(z.string()).optional(),
    projectUrl: z.string().url().optional(),
    seo: seoSchema.optional(),
  }),
});

// Material Categories collection
const materialCategories = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number().default(0),
  }),
});

// Materials collection
const materials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    category: z.string(),
    description: z.string(),
    specifications: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
    images: z.array(z.string()),
    price: z.number().optional(),
    brand: z.string().optional(),
    inStock: z.boolean().default(true),
    featured: z.boolean().default(false),
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
      image: imageSchema.optional(),
    })).optional(),
    history: z.string().optional(),
    testimonials: z.array(z.object({
      customerName: z.string(),
      testimonial: z.string(),
      customerImage: imageSchema.optional(),
    })).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    awards: z.array(z.object({
      year: z.string(),
      title: z.string(),
      description: z.string().optional(),
      image: imageSchema.optional(),
    })).optional(),
    videoEmbed: z.string().optional(),
    ctaButton: z.object({
      text: z.string(),
      url: z.string().url(),
    }).optional(),
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
    company: z.object({
      name: z.string(),
      tagline: z.string().optional(),
      description: z.string().optional(),
      location: z.string().optional(),
      foundedYear: z.string().optional(),
      contact: contactSchema,
    }),
    socialLinks: z.array(z.object({
      platform: z.string(),
      url: z.string().url(),
    })).optional(),
    seoDefaults: z.object({
      defaultTitle: z.string().optional(),
      defaultOgImage: imageSchema.optional(),
    }).optional(),
    analytics: z.object({
      analyticsId: z.string().optional(),
      googleTagManager: z.string().optional(),
      matomoId: z.string().optional(),
    }).optional(),
    integrations: z.object({
      forms: z.object({
        tally: z.object({
          formId: z.string().optional(),
        }),
      }),
      calendar: z.object({
        username: z.string().optional(),
      }),
    }).optional(),
    seo: seoSchema.optional(),
  }),
});

// Hero Slides collection
const heroSlides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    heading: z.string(),
    subheading: z.string().optional(),
    image: imageSchema,
    ctaButton: z.object({
      text: z.string(),
      url: z.string().url(),
    }),
    order: z.number().default(0),
  }),
});

export const collections = {
  blog,
  portfolio,
  tags,
  serviceCategories,
  services,
  materialCategories,
  materials,
  settings,
  about,
  heroSlides,
};
