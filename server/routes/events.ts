import express from 'express'

import { validateDay } from './helpers.ts'

import * as db from '../db/index.ts'

const router = express.Router()
export default router

// Add new event
router.post('/', async (req, res, next) => {
  try {
    const { name, description, time, locationId, day } = req.body

    const validatedDay = validateDay(day)
    if (!validatedDay) {
      return res.status(400).json({ error: 'Invalid day format' })
    }
    const event = await db.addNewEvent({
      locationId,
      day: validatedDay,
      time,
      name,
      description,
    })

    const url = `/api/v1/events/${event.id}`
    res.setHeader('Location', url)
    res.status(201).json({ location: url })
  } catch (error) {
    next(error)
  }
})

// Delete event
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const result = await db.deleteEvent(id)

    if (result.message.includes('not found')) {
      return res.status(404).json({ message: `Event with ID ${id} not found.` })
    }

    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// Get for editing
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' })
    }

    const result = await db.getEventById(id)

    if (!result) {
      return res.status(404).json({ message: `Event with ID ${id} not found.` })
    }

    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { name, description, time } = req.body
    const id = Number(req.body.id)
    const day = validateDay(req.body.day)
    const locationId = Number(req.body.locationId)

    // TODO: UPDATE the event in the db with the matching ID using these details,
    // if no event has a matching id, respond with a 404 instead
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})
