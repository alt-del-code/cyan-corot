import { collection, fields } from '@keystatic/core';

export const heroSlidesCollection = collection({
  label: 'Hero Slides',
  slugField: 'title',
  path: 'src/content/hero-slides/*',
  format: { data: 'json' },
  schema: {
    title: fields.slug({ name: { label: 'Slide Title' } }),
    heading: fields.text({
      label: 'Heading',
      validation: { isRequired: true }
    }),
    subheading: fields.text({
      label: 'Subheading',
      multiline: true
    }),
    image: fields.image({
      label: 'Background Image',
      directory: 'public/images/hero',
      publicPath: '/images/hero/',
      validation: { isRequired: true }
    }),
    ctaButton: fields.object({
      text: fields.text({ 
        label: 'Button Text',
        validation: { isRequired: true }
      }),
      url: fields.url({ 
        label: 'Button URL',
        validation: { isRequired: true }
      })
    }),
    order: fields.number({
      label: 'Display Order',
      defaultValue: 0
    })
  }
}); 