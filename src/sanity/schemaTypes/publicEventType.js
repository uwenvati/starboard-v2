import { defineField, defineType } from 'sanity'

export const publicEventType = defineType({
    name: 'publicEvent',
    title: 'Public Event',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Event Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Event Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'eventType',
            title: 'Event Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Hackathon', value: 'hackathon' },
                    { title: 'Seminar', value: 'seminar' },
                    { title: 'Workshop', value: 'workshop' },
                    { title: 'Networking', value: 'networking' },
                    { title: 'Talk', value: 'talk' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date & Time',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End Date & Time',
            type: 'datetime',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'Venue name or "Online"',
        }),
        defineField({
            name: 'registrationUrl',
            title: 'Registration URL',
            type: 'url',
            description: 'Link to registration page',
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            type: 'boolean',
            initialValue: true,
            description: 'Only published events appear on the website',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'eventType',
            media: 'image',
        },
    },
    orderings: [
        {
            title: 'Start Date, Newest First',
            name: 'startDateDesc',
            by: [{ field: 'startDate', direction: 'desc' }],
        },
    ],
})
