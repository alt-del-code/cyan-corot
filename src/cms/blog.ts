import { fields, collection } from '@keystatic/core';
import { seoFields } from './shared-schemas';

export const blogCollection = collection({
  label: 'Blog Posts',
  slugField: 'title',
  path: 'src/content/blog/*',
  format: { contentField: 'content' },
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    publishedDate: fields.date({
      label: 'Published Date',
      validation: { isRequired: true },
    }),
    isDraft: fields.checkbox({
      label: 'Draft',
      description: 'Set this post as draft to prevent it from being published',
      defaultValue: true,
    }),
    featured: fields.checkbox({
      label: 'Featured',
      description: 'Feature this post on the homepage',
      defaultValue: false,
    }),
    excerpt: fields.text({
      label: 'Excerpt',
      description: 'A short summary of the post',
      multiline: true,
      validation: { length: { min: 50, max: 200 } },
    }),
    coverImage: fields.image({
      label: 'Cover Image',
      directory: 'public/images/blog',
      publicPath: '/images/blog/',
      validation: { isRequired: true },
    }),
    categories: fields.array(
      fields.text({ label: 'Category' }),
      {
        label: 'Categories',
        itemLabel: props => props.value || 'Category',
      },
    ),
    seo: fields.object(seoFields),
    content: fields.document({
      label: 'Content',
      formatting: true,
      dividers: true,
      links: true,
      images: {
        directory: 'public/images/blog',
        publicPath: '/images/blog/',
      },
    }),
  },
});
