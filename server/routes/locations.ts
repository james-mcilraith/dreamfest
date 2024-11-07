import express from 'express'

import * as db from '../db/index.ts'
import server from '../server.ts'

const router = express.Router()

// GET /api/v1/locations - show all locations
router.get('/', async (req, res, next) => {
  try {
    const id = req.query?.id ? Number(req.query.id) : undefined
    const locations = await db.getAllLocations()

    res.status(locations?.length === 0 ? 404 : 200).json({ locations })
  } catch (error) {
    console.log('Error fetching locations:', error)
    next(error)
  }
})

// GET /api/v1/locations/:id - item by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const location = await db.getLocationById(id)

    if (!location) {
      return res.status(404).json({ error: 'Location by ID not found' })
    }

    res.status(200).json({ location })
  } catch (error) {
    console.error('Error fetching location by ID:', error)
    next(error)
  }
})

// PATCH /api/v1/locations/:id - item by id
router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { name, description } = req.body

    const location = await db.getLocationById(id)

    if (!location) {
      return res.status(404).json({ error: 'Location not found' })
    }

    const updatedLocation = await db.updateLocation(id, { name, description })

    res.status(200).json({ location: updatedLocation })
  } catch (error) {
    console.error('Error updating location:', error)
    next(error)
  }
})

export default router
