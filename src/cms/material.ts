import { collection, fields } from '@keystatic/core';

export const materialCategories = collection({
  label: 'Material Categories',
  slugField: 'name',
  path: 'src/content/materials/categories/*',
  format: { data: 'json' },
  schema: {
    name: fields.slug({ name: { label: 'Category Name' } }),
    title: fields.text({ label: 'Display Title' }),
    description: fields.text({ label: 'Category Description', multiline: true }),
    icon: fields.image({
      label: 'Category Icon',
      directory: 'public/images/materials/categories',
      publicPath: '/images/materials/categories/',
      validation: { isRequired: true }
    }),
    order: fields.number({ label: 'Display Order', defaultValue: 0 })
  }
});

export const materials = collection({
  label: 'Materials',
  slugField: 'name',
  path: 'src/content/materials/products/*',
  format: { data: 'json' },
  schema: {
    name: fields.slug({ name: { label: 'Product Name' } }),
    title: fields.text({ label: 'Display Title' }),
    category: fields.relationship({
      label: 'Category',
      collection: 'materialCategories',
      validation: { isRequired: true }
    }),
    description: fields.text({ 
      label: 'Product Description',
      multiline: true 
    }),
    specifications: fields.array(
      fields.object({
        label: fields.text({ label: 'Specification Label' }),
        value: fields.text({ label: 'Specification Value' })
      }),
      { 
        label: 'Specifications',
        itemLabel: props => props.fields.label.value
      }
    ),
    images: fields.array(
      fields.image({
        label: 'Product Image',
        directory: 'public/images/materials/products',
        publicPath: '/images/materials/products/',
        validation: { isRequired: true }
      }),
      {
        label: 'Product Images',
        validation: { length: { min: 1 } }
      }
    ),
    price: fields.number({
      label: 'Price',
      description: 'Leave empty if price varies or on request'
    }),
    brand: fields.text({ label: 'Brand Name' }),
    inStock: fields.checkbox({ 
      label: 'In Stock', 
      defaultValue: true 
    }),
    featured: fields.checkbox({ 
      label: 'Featured Product', 
      defaultValue: false 
    })
  }
});
