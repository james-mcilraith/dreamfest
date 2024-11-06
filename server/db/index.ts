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

// export async function getLocationById(id: string) {
//   let locations: unknown[] = [] // TODO: replace this with your knex query
//   try {
// console.log('Get locations by ID:', locations);
// } catch (error) {
//   console.log('Error fetching data:', error)
//   throw new Error(
//     `Failed to retrieve data: ${error instanceof Error ? error.message : error}`,
//   )
// }

//   return locations
// }

// export async function updateLocation(id: string) {
//   let locations: unknown[] = [] // TODO: replace this with your knex query
//   try {
// console.log('Get all updatedLocation:', locations);
// } catch (error) {
//   console.log('Error fetching data:', error)
//   throw new Error(
//     `Failed to retrieve data: ${error instanceof Error ? error.message : error}`,
//   )
// }
//  return locations
// }

// export async function addNewEvent(id: string) {
//   let locations: unknown[] = [] // TODO: replace this with your knex query
//   try {
// console.log('Get all updatedLocation:', locations);
// } catch (error) {
//   console.log('Error fetching data:', error)
//   throw new Error(
//     `Failed to retrieve data: ${error instanceof Error ? error.message : error}`,
//   )
// }
//   return locations
// }

// export async function deleteEvent(id: string) {
//   let locations: unknown[] = [] // TODO: replace this with your knex query

//   try {
// console.log('Get all updatedLocation:', locations);
// } catch (error) {
//   console.log('Error fetching data:', error)
//   throw new Error(
//     `Failed to retrieve data: ${error instanceof Error ? error.message : error}`,
//   )
// }
//   return locations
// }
