import express from 'express'

import * as db from '../db/index.ts'
import server from '../server.ts'

const router = express.Router()

// GET /api/v1/locations
router.get('/', async (req, res, next) => {
  try {
    const id = req.query.id ? Number(req.query.id) : undefined
    const locations = await db.getAllLocations(id)

    if (!locations || locations.length === 0) {
      return res
        .status(404)
        .json({ message: 'No locations found', locations: [] })
    }

    res.json({ locations })
  } catch (error) {
    console.error('Error fetching locations:', error)
    next(error)
  }
})

// router.get('/:id', async (req, res, next) => {
//   try {
//     // TODO: Get the location based on its id and replace this viewData
//     const location = {}
//     res.json(location)
//   } catch (error) {
//     console.error('Error fetching locations by id:', error)
//     next(error)
//   }
// })

// router.patch('/:id', async (req, res, next) => {
//   try {
//     const id = Number(req.params.id)
//     const { name, description } = req.body
//     // TODO: call db.updateLocation with these details
//     res.sendStatus(204)
//   } catch (error) {
//     console.error('Error updating locations:', error)
//     next(error)
//   }
// })

export default router
