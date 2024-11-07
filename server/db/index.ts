import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'
const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

// getAllLocations
export async function getAllLocations(): Promise<Location[]> {
  try {
    const result = await connection('locations')
    return result as Location[]
  } catch (error) {
    console.log('Error fetching locations:', error)
    throw error
  }
}

// getEventsByDay
export async function getEventsByDay(day: string) {
  try {
    const result = await connection('events as event')
      .join('locations as location', 'event.location_id', 'location.id')
      .where('event.day', day)
      .select(
        'event.id as id',
        'event.day',
        'event.time',
        'event.name as eventName',
        'event.description as description',
        'location.name as locationName',
      )
    return result as Event[]
  } catch (error) {
    console.log('Error fetching events by day :', error)
    throw error
  }
}

// getLocationById
export async function getLocationById(id: string) {
  try {
    const result = await connection('locations')
      .where('locations.id', id)
      .select('id', 'name', 'description')
      .first()

    return result || null
  } catch (error) {
    console.log('Error fetching location by ID:', error)
    throw error
  }
}

// updateLocation
export async function updateLocation(id: string) {
  try {
    const result = await connection('locations').select(
      'id',
      'name',
      'description',
    )

    return result || null
  } catch (error) {
    console.log('Error updating location:', error)
    throw error
  }
}

// addNewEvent
export async function addNewEvent(newEvent: EventData) {
  try {
    const result = await connection('events')
      .insert({
        name: newEvent.name,
        day: newEvent.day,
        time: newEvent.time,
        location_id: newEvent.locationId,
        description: newEvent.description,
      })
      .returning('*')

    if (result.length === 0) {
      throw new Error('Unable to add new event, no data returned')
    }

    const createdEvent = result[0]

    return {
      id: createdEvent.id,
      ...newEvent,
    }
  } catch (error) {
    console.log('Error creating new event:', error)
    throw error
  }
}
// deleteEvent
export async function deleteEvent(id: string) {
  try {
    const result = await connection('events').where('id', id).delete()

    if (result > 0) {
      console.log(`Event with ID ${id} deleted successfully.`)
      return { message: `Event with ID ${id} deleted successfully.` }
    } else {
      console.log(`Event with ID ${id} not found.`)
      return { message: `Event with ID ${id} not found.` }
    }
  } catch (error) {
    console.error('Error deleting event:', error)
    throw new Error('Failed to delete event. Please try again later.')
  }
}

// getLocationById (for editing)
export async function getEventById(id: string) {
  try {
    const result = await connection('events')
      .where('events.id', id)
      .select(
        'id',
        'location_id as locationID',
        'day',
        'time',
        'name',
        'description',
      )
      .first()

    return result || null
  } catch (error) {
    console.log('Error fetching location by ID:', error)
    throw error
  }
}

// Update event (following editing)
export async function updateEvent()

// Up to this point... in the STRETCH
