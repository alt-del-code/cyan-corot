import { singleton, fields } from '@keystatic/core';
import { seoFields } from './shared-schemas';

// Reusable field definitions for similar patterns
const textField = (label, description, validation = {}) => fields.text({ label, description, validation });
const imageField = (label, description, directory, publicPath) => fields.image({
  label,
  description,
  directory,
  publicPath,
});
const arrayObjectField = (fieldsDefinition, label, itemLabel) => fields.array(
  fields.object(fieldsDefinition),
  { label, itemLabel }
);

// Reusable definitions for common field types
const statFields = {
  value: textField("Stat Value", "The value of the statistic (e.g., '100+')", { isRequired: true }),
  label: textField("Stat Label", "The label for the statistic (e.g., 'Projects Completed')", { isRequired: true }),
  description: textField("Stat Description", "A brief description of the statistic.", { multiline: true }),
};

const coreValueFields = {
  title: textField("Value Title", "The title of the company value.", { isRequired: true }),
  description: textField("Value Description", "A brief description of the company value.", { multiline: true }),
  icon: textField("Icon Name", "Enter the Lucide icon name (e.g., 'heart', 'star', 'award').", { isRequired: true }),
};

const teamMemberFields = {
  name: textField("Name", "The name of the team member.", { isRequired: true }),
  position: textField("Position", "The position of the team member.", { isRequired: true }),
  bio: textField("Bio", "A brief biography of the team member.", { multiline: true }),
  image: imageField("Profile Image", "The photo of the team member.", "public/images/team", "/images/team/"),
  socialLinks: arrayObjectField(
    {
      platform: fields.select({
        label: "Platform",
        description: "The social media platform for the link.",
        options: [
          { label: "LinkedIn", value: "linkedin" },
          { label: "Twitter", value: "twitter" },
          { label: "GitHub", value: "github" },
          { label: "Instagram", value: "instagram" },
        ],
        defaultValue: "linkedin",
      }),
      url: fields.url({
        label: "Profile URL",
        description: "The URL to the social media profile.",
      }),
    },
    "Social Media Links",
    (props) => props.fields.platform.value
  ),
};

const milestoneFields = {
  year: textField("Year", "The year of the milestone (e.g., '2020')", { isRequired: true }),
  title: textField("Milestone Title", "The title of the milestone.", { isRequired: true }),
  description: textField("Description", "A brief description of the milestone.", { multiline: true }),
  image: imageField("Milestone Image", "An image representing the milestone.", "public/images/milestones", "/images/milestones/"),
};

const faqFields = {
  question: textField("Question", "The frequently asked question.", { isRequired: true }),
  answer: textField("Answer", "The answer to the frequently asked question.", { multiline: true, isRequired: true }),
};

const awardFields = {
  year: textField("Year", "The year the award was received.", { isRequired: true }),
  title: textField("Award Title", "The title of the award or accolade.", { isRequired: true }),
  description: textField("Award Description", "A description of the award or accolade.", { multiline: true }),
  image: imageField("Award Image", "An image representing the award.", "public/images/awards", "/images/awards/"),
};

const testimonialFields = {
  customerName: textField("Customer Name", "The name of the customer giving the testimonial.", { isRequired: true }),
  testimonial: textField("Testimonial", "The testimonial text.", { multiline: true, isRequired: true }),
  customerImage: imageField("Customer Image", "An image of the customer.", "public/images/testimonials", "/images/testimonials/"),
};

const videoEmbedField = textField("Video Embed Code", "Embed code for the company intro video (e.g., from YouTube or Vimeo).");

const ctaButtonField = fields.object({
  text: textField("Button Text", "The text on the call to action button.", { isRequired: true }),
  url: fields.url({ label: "Button URL", description: "The URL the button links to.", isRequired: true }),
});

// Singleton schema for the About page
export const about = singleton({
  label: "About Page",
  path: "src/content/about/about", // Changed to a specific file path
  slugField: "title",
  format: { contentField: "content" },
  schema: {
    meta: fields.object(seoFields),

    title: textField("Page Title", "The main title of the About page.", { isRequired: true }),
    subtitle: textField("Subtitle", "A supporting subtitle for the page."),
    intro: textField("Introduction", "A brief introduction to the company.", { multiline: true }),

    // Using reusable arrayObjectField function
    stats: arrayObjectField(statFields, "Statistics", (props) => `${props.fields.label.value}: ${props.fields.value.value}`),
    vision: textField("Vision", "The company's vision statement.", { multiline: true }),
    mission: textField("Mission", "The company's mission statement.", { multiline: true }),

    // Using reusable arrayObjectField function for core values
    values: arrayObjectField(coreValueFields, "Core Values", (props) => props.fields.title.value || "Value"),

    // Using reusable arrayObjectField function for team members
    team: arrayObjectField(teamMemberFields, "Team Members", (props) => props.fields.name.value || "Team Member"),

    // Using reusable arrayObjectField function for milestones
    milestones: arrayObjectField(milestoneFields, "Company Milestones", (props) => `${props.fields.year.value}: ${props.fields.title.value}`),

    // Adding additional sections
    history: textField("Company History", "A brief history of the company.", { multiline: true }),
    testimonials: arrayObjectField(testimonialFields, "Customer Testimonials", (props) => props.fields.customerName.value || "Testimonial"),
    faqs: arrayObjectField(faqFields, "Frequently Asked Questions", (props) => props.fields.question.value || "FAQ"),
    awards: arrayObjectField(awardFields, "Awards and Accolades", (props) => `${props.fields.year.value}: ${props.fields.title.value}`),
    videoEmbed: videoEmbedField,
    ctaButton: ctaButtonField,

    content: fields.document({
      label: "Additional Content",
      description: "Add any additional content that doesn't fit into the other sections.",
      formatting: true,
      dividers: true,
      links: true,
      images: {
        directory: "public/images/about",
        publicPath: "/images/about/",
      },
    }),
  },
});
