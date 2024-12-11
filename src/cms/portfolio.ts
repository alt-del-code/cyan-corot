import { fields, collection } from '@keystatic/core';
import { seoFields } from './shared-schemas';

export const portfolioCollection = collection({
  label: 'Portfolio',
  slugField: 'title',
  path: 'src/content/portfolio/*',
  format: { contentField: 'content' },
  schema: {
    title: fields.slug({ name: { label: 'Project Title' } }),
    completionDate: fields.date({
      label: 'Completion Date',
      validation: { isRequired: true },
    }),
    client: fields.text({
      label: 'Client Name',
      validation: { isRequired: true },
    }),
    featured: fields.checkbox({
      label: 'Featured Project',
      description: 'Feature this project on the homepage',
      defaultValue: false,
    }),
    shortDescription: fields.text({
      label: 'Short Description',
      multiline: true,
      validation: { length: { max: 150 } },
    }),
    thumbnail: fields.image({
      label: 'Thumbnail Image',
      directory: 'public/images/portfolio',
      publicPath: '/images/portfolio/',
      validation: { isRequired: true },
    }),
    projectImages: fields.array(
      fields.image({
        label: 'Project Image',
        directory: 'public/images/portfolio',
        publicPath: '/images/portfolio/',
      }),
      {
        label: 'Project Images',
        itemLabel: props => 'Image',
      },
    ),
    services: fields.array(
      fields.relationship({
        label: 'Service',
        collection: 'services',
        validation: { isRequired: true },
      }),
      {
        label: 'Services Provided',
        itemLabel: props => props.value || 'Service',
      }
    ),
    materialsUsed: fields.array(
      fields.relationship({
        label: 'Material',
        collection: 'materials',
        validation: { isRequired: true },
      }),
      {
        label: 'Materials Used',
        itemLabel: props => props.value || 'Material',
        description: 'Select materials used in this project',
      }
    ),
    materialSupply: fields.array(
      fields.relationship({
        label: 'Available Material',
        collection: 'materials',
        validation: { isRequired: true },
      }),
      {
        label: 'Materials Available for Supply',
        itemLabel: props => props.value || 'Material',
        description: 'Select materials available for supply to clients',
      }
    ),
    fabricationProcess: fields.text({
      label: 'Fabrication Process',
      multiline: true,
      description: 'Describe the fabrication process used for this project.',
    }),
    projectScope: fields.text({
      label: 'Project Scope',
      multiline: true,
      description: 'Describe the scope of the project and what was delivered.',
    }),
    deliverables: fields.array(
      fields.text({ label: 'Deliverable' }),
      {
        label: 'Project Deliverables',
        itemLabel: props => props.value || 'Deliverable',
      }
    ),
    clientTestimonial: fields.text({
      label: 'Client Testimonial',
      multiline: true,
      description: 'Optional: Add a testimonial or feedback from the client.',
    }),
    projectDuration: fields.text({
      label: 'Project Duration',
      description: 'Enter the duration of the project (e.g., 3 months).',
    }),
    projectBudget: fields.text({
      label: 'Project Budget',
      description: 'Optional: Enter the budget for this project.',
    }),
    serviceCategory: fields.relationship({
      label: 'Service Category',
      collection: 'serviceCategories',
      validation: { isRequired: true },
    }),
    tags: fields.array(
      fields.relationship({
        label: 'Tag',
        collection: 'tags',
        validation: { isRequired: true },
      }),
      {
        label: 'Project Tags',
        itemLabel: props => props.value || 'Tag',
      }
    ),
    projectChallenges: fields.text({
      label: 'Project Challenges',
      multiline: true,
      description: 'Describe any challenges faced during the project.',
    }),
    projectSolutions: fields.text({
      label: 'Project Solutions',
      multiline: true,
      description: 'Describe how challenges were resolved.',
    }),
    beforeAfterImages: fields.array(
      fields.image({
        label: 'Before/After Image',
        directory: 'public/images/portfolio/before-after',
        publicPath: '/images/portfolio/before-after/',
      }),
      {
        label: 'Before and After Images',
        itemLabel: props => 'Image',
      }
    ),
    technologies: fields.array(
      fields.text({ label: 'Technology' }),
      {
        label: 'Technologies Used',
        itemLabel: props => props.value || 'Technology',
      },
    ),
    projectUrl: fields.url({
      label: 'Project URL',
    }),
    seo: fields.object(seoFields),
    content: fields.document({
      label: 'Project Details',
      formatting: true,
      dividers: true,
      links: true,
      images: {
        directory: 'public/images/portfolio',
        publicPath: '/images/portfolio/',
      },
    }),
  },
});