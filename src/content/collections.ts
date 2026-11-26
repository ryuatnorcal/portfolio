import { TECH_CATEGORIES } from "@/content/siteText"

// Editable lists in the dashboard. Shared by the editor UI and the server
// actions, which only accept the fields listed here.

export type FieldType = 'text' | 'textarea' | 'select' | 'url'

export type CollectionField = {
  name: string,
  label: string,
  type: FieldType,
  required?: boolean,
  options?: readonly string[],
  hint?: string,
}

export type CollectionName = 'experience' | 'project' | 'techStack' | 'service'

export type CollectionConfig = {
  title: string,
  itemLabel: string,
  fields: CollectionField[],
  // field shown as each item's heading in the list
  summary: string,
  // items are ordered within groups of this field (e.g. tech category)
  groupBy?: string,
}

export const collections: Record<CollectionName, CollectionConfig> = {
  experience: {
    title: 'Experience',
    itemLabel: 'experience',
    summary: 'title',
    fields: [
      { name: 'title', label: 'Role', type: 'text', required: true },
      { name: 'company', label: 'Company', type: 'text', required: true },
      { name: 'years', label: 'Years', type: 'text', required: true, hint: 'e.g. 2016/08 - 2018/04' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
    ],
  },
  project: {
    title: 'Projects',
    itemLabel: 'project',
    summary: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'year', label: 'Year', type: 'text', required: true },
      { name: 'link', label: 'Link', type: 'url', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'modalTitle', label: 'Popup title', type: 'text', hint: 'Leave empty for no detail popup' },
      { name: 'modalYear', label: 'Popup year', type: 'text' },
      { name: 'modalImg', label: 'Popup image', type: 'text', hint: 'File name of the screenshot' },
      { name: 'modalUrl', label: 'Popup URL', type: 'url' },
      { name: 'modalDescription', label: 'Popup description', type: 'textarea' },
    ],
  },
  techStack: {
    title: 'Tech stack',
    itemLabel: 'technology',
    summary: 'name',
    groupBy: 'category',
    fields: [
      { name: 'category', label: 'Category', type: 'select', required: true, options: TECH_CATEGORIES },
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'icon', label: 'Icon', type: 'text', required: true, hint: 'File name in public/icons, e.g. icons8-nextjs.svg' },
    ],
  },
  service: {
    title: 'Services',
    itemLabel: 'service',
    summary: 'name',
    fields: [
      { name: 'name', label: 'Service', type: 'text', required: true },
    ],
  },
}

export const isCollectionName = (name: string): name is CollectionName => name in collections

// Longest value accepted for any field.
export const MAX_FIELD_LENGTH = 10000
