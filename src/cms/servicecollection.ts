import { fields, collection } from '@keystatic/core';

export const servicesCollection = collection({
  label: 'Services',
  slugField: 'title',
  path: 'src/content/services/*',
  schema: {
    title: fields.text({
      label: 'Service Title',
      validation: { isRequired: true },
    }),
    description: fields.text({
      label: 'Service Description',
      multiline: true,
    }),
    category: fields.relationship({
      label: 'Service Category',
      collection: 'serviceCategories',
      validation: { isRequired: true },
    }),
    serviceImage: fields.image({
      label: 'Service Image',
      directory: 'public/images/services',
      publicPath: '/images/services/',
    }),
  },
});