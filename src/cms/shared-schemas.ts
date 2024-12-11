import { fields } from '@keystatic/core';

// Reusable SEO fields schema
export const seoFields = {
  title: fields.text({
    label: 'SEO Title',
    description: 'Override the default title for SEO (optional)',
    validation: { length: { max: 60 } },
  }),
  description: fields.text({
    label: 'SEO Description',
    description: 'Override the default description for SEO (optional)',
    multiline: true,
    validation: { length: { max: 160 } },
  }),
  keywords: fields.array(
    fields.text({ label: 'Keyword' }),
    {
      label: 'SEO Keywords',
      itemLabel: props => props.value || 'Keyword',
      description: 'Add keywords for SEO',
    },
  ),
  ogImage: fields.image({
    label: 'Social Share Image',
    description: 'Image shown when sharing on social media (optional)',
    directory: 'public/images/seo',
    publicPath: '/images/seo/',
  }),
  noIndex: fields.checkbox({
    label: 'No Index',
    description: 'Prevent this content from being indexed by search engines',
    defaultValue: false,
  }),
};

// Reusable contact fields schema
export const contactFields = {
  address: fields.object({
    street: fields.text({ label: 'Street' }),
    city: fields.text({ label: 'City' }),
    state: fields.text({ label: 'State' }),
    zip: fields.text({ label: 'ZIP Code' }),
    full: fields.text({ label: 'Full Address', multiline: true }),
    maps: fields.url({ label: 'Google Maps URL' }),
  }),
  phone: fields.object({
    primary: fields.text({ label: 'Primary Phone' }),
    secondary: fields.text({ label: 'Secondary Phone' }),
  }),
  email: fields.object({
    primary: fields.text({ label: 'Primary Email' }),
    support: fields.text({ label: 'Support Email' }),
  }),
}; 