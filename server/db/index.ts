import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'
const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllLocations(id: number): Promise<Location[]> {
  let result: Location[] = []
  try {
    const query = connection('locations')
    if (id !== undefined) {
      query.where('id', id)
    }
    result = await query
    console.log(result)
  } catch (error) {
    console.error('Error fetching locations:', error)
    throw new Error(
      `Failed to retrieve location data: ${error instanceof Error ? error.message : error}`,
    )
  }
  return result as Location[]
}

// export async function getEventsByDay(day: string) {
//   let events: unknown[] = []
//   try {
// const result = await connection('events').join(
// console.log('Get events by day:', events);
// } catch (error) {
//   console.log('Error fetching data:', error)
//   throw new Error(
//     `Failed to retrieve data: ${error instanceof Error ? error.message : error}`,
//   )
// }

//   return events
// }

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
