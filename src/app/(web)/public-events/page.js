'use client'
import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'

// Image URL builder - lazy initialization
let _builder = null
function urlFor(source) {
  if (!_builder) {
    _builder = imageUrlBuilder(client)
  }
  return _builder.image(source)
}

const PublicEventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'hackathon', label: 'Hackathons' },
    { id: 'seminar', label: 'Seminars' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'networking', label: 'Networking' },
    { id: 'talk', label: 'Talks' },
  ]

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await client.fetch(`
          *[_type == "publicEvent" && isPublished == true] | order(startDate asc) {
            _id,
            title,
            slug,
            description,
            image,
            eventType,
            startDate,
            endDate,
            location,
            registrationUrl
          }
        `)
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const filteredEvents = events.filter((event) => {
    const matchesFilter = selectedFilter === 'all' || event.eventType === selectedFilter
    const matchesSearch = searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {event.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={urlFor(event.image).width(600).height(400).url()}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-primary-50 text-primary text-sm font-medium rounded-full capitalize">
            {event.eventType}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(event.startDate)} at {formatTime(event.startDate)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            Register Now
          </a>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl flex-col items-center justify-center flex text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Events
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Join us for workshops, networking sessions, and inspiring talks from
            industry leaders and successful entrepreneurs.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl mb-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${selectedFilter === filter.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid or Empty State */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl pb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Events Currently
            </h3>
            <p className="text-gray-600 mb-8">
              We don't have any events scheduled at the moment. Check back soon for
              upcoming workshops, seminars, and networking opportunities!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PublicEventsPage

