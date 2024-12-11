import { fields, collection } from '@keystatic/core';

export const tagCollection = collection({
  label: 'Tag',
  slugField: 'name',
  path: 'src/content/tag/*',
  schema: {
    name: fields.text({
      label: 'Name',
      validation: { isRequired: true },
    }),
    description: fields.text({
      label: 'Description',
      multiline: true,
    }),
  },
});