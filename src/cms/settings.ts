import { fields, singleton } from '@keystatic/core';
import { contactFields } from './shared-schemas';

export const siteSettings = singleton({
  label: 'Site Settings',
  path: 'src/content/settings/site',
  schema: {
    siteName: fields.text({
      label: 'Site Name',
      validation: { isRequired: true },
    }),
    siteDescription: fields.text({
      label: 'Site Description',
      multiline: true,
      validation: { length: { max: 200 } },
    }),
    logo: fields.image({
      label: 'Site Logo',
      directory: 'public/images',
      publicPath: '/images/',
    }),
    favicon: fields.image({
      label: 'Favicon',
      directory: 'public',
      publicPath: '/',
    }),
    company: fields.object({
      name: fields.text({ label: 'Company Name', validation: { isRequired: true } }),
      tagline: fields.text({ label: 'Tagline' }),
      description: fields.text({ label: 'Description', multiline: true }),
      location: fields.text({ label: 'Location' }),
      foundedYear: fields.text({ label: 'Founded Year' }),
      contact: fields.object(contactFields),
    }),
    socialLinks: fields.array(
      fields.object({
        platform: fields.text({ label: 'Platform Name' }),
        url: fields.url({ label: 'Profile URL' }),
      }),
      {
        label: 'Social Links',
        itemLabel: props => props.fields.platform.value || 'Social Link',
      },
    ),
    seoDefaults: fields.object({
      defaultTitle: fields.text({ label: 'Default Title' }),
      defaultOgImage: fields.image({
        label: 'Default OG Image',
        directory: 'public/images/seoDefaults',
        publicPath: '/images/seoDefaults/',
      }),
    }),
    analytics: fields.object({
      analyticsId: fields.text({
        label: 'Analytics ID',
        description: 'Google Analytics or similar tracking ID',
      }),
      googleTagManager: fields.text({
        label: 'Google Tag Manager ID',
        description: 'Google Tag Manager container ID (e.g., GTM-XXXXXX)',
      }),
      matomoId: fields.text({
        label: 'Matomo ID',
        description: 'Matomo tracking ID',
      }),
    }),
    integrations: fields.object({
      forms: fields.object({
        tally: fields.object({
          formId: fields.text({ label: 'Tally Form ID' }),
        }),
      }),
      calendar: fields.object({
        username: fields.text({ label: 'Calendar Username' }),
      }),
    }),
  },
});