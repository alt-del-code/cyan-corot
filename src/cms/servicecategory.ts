import { fields, collection } from '@keystatic/core';

export const serviceCategoriesCollection = collection({
  label: 'Service Categories',
  slugField: 'name',
  path: 'src/content/service-categories/*',
  schema: {
    name: fields.text({
      label: 'Category Name',
      validation: { isRequired: true },
    }),
    description: fields.text({
      label: 'Category Description',
      multiline: true,
    }),
  },
});