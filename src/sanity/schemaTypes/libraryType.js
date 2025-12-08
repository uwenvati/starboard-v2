import {defineField, defineType} from 'sanity'

export const libraryType = defineType({
  name: 'libraryItem',          // used when querying
  title: 'Library Item',        // what shows in Studio
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail Image',
      type: 'image',
    }),
    defineField({
      name: 'file',
      title: 'Downloadable File',
      type: 'file',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
  ],
})
